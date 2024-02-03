package com.cognira.api

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import com.cognira.api.routes.client
import com.cognira.api.utils.{convertValues, getSchema, maptoDataFrame, readFile, saveFile, schema2LinkedHashMap}
import com.cognira.datalake.datalakeDriver.{ getFileSystem, readFromADL, writeToADL}
import org.apache.spark.SparkException
import org.apache.spark.sql.functions.typedLit
import org.apache.spark.sql.{DataFrame, SparkSession}

import java.util.UUID
import java.util.concurrent.{Callable, CompletableFuture, Executors}
import java.util.function.Supplier
import scala.collection.mutable
import scala.concurrent.{ExecutionContextExecutor, Future}
import scala.compat.java8.FutureConverters._
import java.io.File
import scala.reflect.io.Directory

object helpers{

  val parallel = Executors.newFixedThreadPool(100)
  implicit val system :ActorSystem[Nothing] = ActorSystem(Behaviors.empty,"helpers")
  implicit val executor: ExecutionContextExecutor = system.executionContext
  val spark = SparkSession.builder().appName("parq file manager").master("local").getOrCreate()

  /**
   * function to read parquet files directly from the azure data lake
   * @param container
   * @param filepath
   * @return Future of the data in Map format
   */
  def readFileFromADL(container:String,filepath:String): Future[Map[String,Any]] ={
    val schema = parallel.submit(new Callable[Map[String,Any]] {
      override def call(): Map[String, Any] = {
        try {
          val filesystem = getFileSystem(client, container)
          val filename = UUID.randomUUID().toString + ".parquet"
          val dataframe = readFromADL(filename, filesystem, filepath)
          val mappeddata = schema2LinkedHashMap(dataframe)
          if (dataframe == null) return Map[String, String]("status" -> "error", "message" -> "The file doesn't exist! Please try to upload it again!")

          Map("status" -> "file read successfully from the datalake", "filename" -> s"${filename}", "container" -> s"$container", "adlfilepath" -> s"$filepath", "data" -> mappeddata)

        } catch {
          case ex: Exception =>
            Map[String, String]("status" -> "error", "messgae" -> ex.getMessage)
        }
      }
    })
    toScala(CompletableFuture.supplyAsync(new Supplier[Map[String,Any]] {
      override def get(): Map[String,Any]= {
        schema.get()
      }
    }))
  }

  /**
   * function to write the parquet file directly from the data lake
   * @param container: container name of the data lake
   * @param filename: filename of the local parquet file
   * @param filepath: file path inside the container of the data lake
   * @return
   */
  def saveDataToADL(container:String,filename:String,filepath:String): Future[String] ={
    Future{
      val df = readFile(filename)
      df.show(10)
      saveFile(df, filename)

      val directory = new Directory(new File("./" + filename))
      var file: String = ""
      for {e <- directory.list.toList} {
        if (e.toString().startsWith("./" + filename + "/part")) file = e.toFile.name
        println(e.toFile.name)
      }

      println(directory.list.toList(3).toString())

      val filesystem = getFileSystem(client, container)
      writeToADL(filesystem, "./"+filename+"/"+file, filepath)
      //        directory.deleteRecursively()
      """{"status":"success","message":"Parquet file saved successfully to the datalake"}"""
    }

  }

  /**

   * @param filename: filename of the local parquet file
   * @return future of the schema in Map format
   */
  def showSchema(filename:String): Future[Map[String,String]] = {
    val schema = parallel.submit(new Callable[Map[String,String]] {
      override def call(): Map[String, String] = {
        try{
          val dataframe = readFile(filename)
          if(dataframe == null) return Map[String,String]("status" -> "error","error" -> "The file doesn't exist! Please try to upload it again!" )
          dataframe.dtypes.map(row => row).toMap[String,String]
        }catch{
          case ex:Exception => Map[String,String]("status" -> "error","error" -> ex.getMessage)
        }
      }
    })
    toScala(CompletableFuture.supplyAsync(new Supplier[Map[String, String]] {
      override def get(): Map[String, String]= {
        schema.get()
      }
    }))
  }

  /**
   * function that returns data from the parquet file
   * @param filename:filename of the local parquet file
   * @return the data in Map format
   */
  def getAllData(filename:String): Future[Array[mutable.LinkedHashMap[String,Any]]] ={
    val allData = parallel.submit(new Callable[Array[mutable.LinkedHashMap[String,Any]]](){
      override def call(): Array[mutable.LinkedHashMap[String, Any]] = {
        try{
          val dataframe = readFile(filename)
          if(dataframe == null) return Array(mutable.LinkedHashMap[String,Any]("status" -> "error","error" -> "The file doesn't exist! Please try to upload it again!"))
          var data:Array[mutable.LinkedHashMap[String,Any]] = null
          try{
          data = schema2LinkedHashMap(dataframe)

          }catch{
            case ex:Exception =>Array(mutable.LinkedHashMap[String,Any]("status" -> "error","error" -> ex.getMessage))
          }
          data
        }catch{
          case ex:Exception =>Array(mutable.LinkedHashMap[String,Any]("status" -> "error","error" -> ex.getMessage))
        }
      }
    })
    toScala(CompletableFuture.supplyAsync(new Supplier[Array[mutable.LinkedHashMap[String, Any]]] {
      override def get(): Array[mutable.LinkedHashMap[String, Any]] = {
        allData.get()
      }
    }))
  }

  /**
   * function that gets specific data from the parquet file based on keywords provided by the user
   * @param filename: file name of the local parquet file
   * @param selector: List of dataframe columns
   * @param value: List of the values
   * @return Future[Array[mutable.LinkedHashMap[String,Any]]]
   */
  def getData(filename:String,selector:Array[String] ,value:Array[String]): Future[Array[mutable.LinkedHashMap[String,Any]]] = {
    val ddata = parallel.submit(new Callable[Array[mutable.LinkedHashMap[String,Any]]]() {
      override def call(): Array[mutable.LinkedHashMap[String,Any]]  = {
        try{
          if(selector.length == 0 || value.length == 0 ) return Array(mutable.LinkedHashMap[String,Any]("status" -> "error","message"->"Selectors or their values shouldn't be empty !"))
          if(selector.length != value.length ) return Array(mutable.LinkedHashMap[String,Any]("status" -> "error","message"->"Not the same number of parameters !"))
          val dataframe = readFile(filename)
          if(dataframe == null) return Array(mutable.LinkedHashMap[String,Any]("status" -> "error","error" -> "The file doesn't exist! Please try to upload it again!"))
          var conditions = s""
          selector.zip(value).foreach {
            case (s:String ,v:String) => {
              if( s != "" || s!= null || s!=" ") conditions += s"$s=='$v' and "
            }
          }
          println(conditions)
          if(conditions.isEmpty) return Array(mutable.LinkedHashMap[String,Any]("status" -> "error","message"->"Selectors or their values shouldn't be empty !"))
          val cleanQuery = conditions.substring(0,conditions.length-4)
          val data = dataframe.where(cleanQuery)
          schema2LinkedHashMap(data)
        }catch{
          case ex:Exception => Array(mutable.LinkedHashMap[String,Any]("status" -> "error","error" -> ex.getMessage))

        }
      }
    })
    toScala(CompletableFuture.supplyAsync(new Supplier[Array[mutable.LinkedHashMap[String, Any]]] {
      override def get(): Array[mutable.LinkedHashMap[String, Any]] = {
        ddata.get()
      }
    }))
  }


  /**
   * function to add the data given by the updated_data to the parquet file
   * @param added_data
   * @return
   */
  def addData(added_data:mutable.LinkedHashMap[String,Any]):Future[String] ={
    val addedData = parallel.submit(new Callable[String](){
      override def call(): String = {
        try{
          val filename = added_data("filename").asInstanceOf[String]
          added_data.remove("filename")
          val file = readFile(filename)
          if(file == null) return """[{"status":"error","message":"The file doesn't exist! Please try to upload it again!"}]"""
          val newnew = convertValues(added_data,getSchema(file))
          val newData:DataFrame = maptoDataFrame(newnew,file.schema)
          if(newData == null) return """[{"status":"error","message":"missing keys and values !"}]"""
          val data = file.union(newData)
          data.show(10)
          val testfile:String = UUID.randomUUID().toString + ".parquet"
          try{
            saveFile(data,testfile)
            val directory = new Directory(new File("./"+testfile))
            directory.deleteRecursively()
          }catch{
            case exception: SparkException => {
              val directory = new Directory(new File("./"+testfile))
              directory.deleteRecursively()
              return s"""[{"status":"error","message":"Type Incompatibility !"]"""
            }
          }
          saveFile(data,filename)
          "added"
        }catch{
          case ex:Exception => s"""[{"status":"error","message":"${ex.getMessage}"]"""
        }

      }
    })
    toScala(CompletableFuture.supplyAsync(new Supplier[String] {
      override def get(): String = {
        addedData.get()
      }
    }))
  }


  /**
   * function to delete specific data from the dataframe by keywords provided by the user
   * @param filename: local file name of the parquet file
   * @param selector: List of column name
   * @param value: List of the values for each column
   * @param many: bollean variable to make sure that the updated_data want to delete many rows or not
   * @return
   */
  def deleteData(filename:String,selector:Array[String],value:Array[String],many:Boolean): Future[String] ={
    val delete = parallel.submit(new Callable[String] {
      override def call(): String = {
        try{
          if(selector.length == 0 || value.length == 0 ) return """[{"status":"error","message":"Selectors or their values shouldn't be empty !"}]"""
          if(selector.length != value.length) return """[{status:"error","message":"Not the same number of parameters !"}]"""
          val dataframe = readFile(filename)
          if(dataframe == null) return """[{"status":"error","message":"The file doesn't exist! Please try to upload it again!"}]"""
          var conditions = s""
          selector.zip(value).foreach {
            case (s:String ,v:String) => {
              if( s != "" ) conditions += s"$s=='$v' and "
            }
          }
          if(conditions.isEmpty) return """[{"status":"error","message":"selectors or their values shouldn't be empty !"}]"""
          val cleanQuery = conditions.substring(0,conditions.length-4)
          val deletedData = dataframe.where(cleanQuery)
          if (deletedData.count() > 1 && !many) return null
          if (deletedData.count() == 0) return "empty"

          val newDataRDD = dataframe.rdd.subtract(deletedData.rdd)
          val newData =  spark.createDataFrame(newDataRDD,dataframe.schema)
          newData.show()
          saveFile(newData,filename)
          "deleted"
        }catch{
          case ex:Exception => s"""[{"status":"error","message":${ex.getMessage}]"""
        }
      }
    })
    toScala(CompletableFuture.supplyAsync(new Supplier[String] {
      override def get(): String = {
        delete.get()
      }
    }))
  }

  /**
   * function to update specific rows in the dataframe
   * @param updated_data
   * @return
   */
  def updateData(updated_data: mutable.LinkedHashMap[String,Any]): Future[String] ={
    val update = parallel.submit(new Callable[String] {
      override def call(): String = {
        try{
          val selector = updated_data("selector").asInstanceOf[Seq[String]]
          val value = updated_data("selectorValue").asInstanceOf[Seq[String]]
          if(selector.isEmpty ||value.isEmpty ) return """[{"status":"error","message":"selectors or their values shouldn't be empty !"}]"""
          if(selector.length != value.length) return """[{"status":"error","message":"Not the same number of parameters"}]"""
          val filename = updated_data("filename").asInstanceOf[String]
          updated_data.remove("selector")
          updated_data.remove("selectorValue")
          updated_data.remove("filename")
          val dataframe = readFile(filename)
          if(dataframe == null) return """[{"status":"error","message":"The file doesn't exist! Please try to upload it again!"}]"""
          var conditions = s""
          selector.zip(value).foreach {
            case (s:String ,v:String) => {
              if( s != "" ) conditions += s"$s=='$v' and "
            }
          }
          println(conditions)
          if(conditions.isEmpty) return """[{"status":"error","message":"selectors or their values shouldn't be empty !"}]"""
          val cleanQuery = conditions.substring(0,conditions.length-4)
          val deletedData = dataframe.where(cleanQuery)
          if(deletedData.count() > 1) return null
          if(deletedData.count() == 0) return "empty"
          val newDataRDD = dataframe.rdd.subtract(deletedData.rdd)
          val newData =  spark.createDataFrame(newDataRDD,dataframe.schema)

          val newnew = convertValues(updated_data,getSchema(dataframe))
          val aa:DataFrame = maptoDataFrame(newnew,dataframe.schema)
          println("Data added successfully")
          val data = newData.union(aa)
          data.show(10)
          val testfile:String = UUID.randomUUID().toString + ".parquet"
          try{
            saveFile(data,testfile)
            val directory = new Directory(new File("./"+testfile))
            directory.deleteRecursively()
          }catch{
            case exception: SparkException => {
              val directory = new Directory(new File("./"+testfile))
              directory.deleteRecursively()
              return s"""[{"status":"error","message":"Type Incompatibility !"]"""
            }
          }
          saveFile(data,filename)
          "updated"
        }catch {
          case ex:Exception => s"""[{"status":"error","message":"${ex.getMessage}"]"""
        }
      }
    })
    toScala(CompletableFuture.supplyAsync(new Supplier[String] {
      override def get(): String = {
        update.get()
      }
    }))
  }

  /**
   * function to get the data form the parquet file sorted
   * @param filename: local file name
   * @param selector: List of column names
   * @return
   */
  def orderDataFrame(filename:String,selector:Array[String]): Future[Array[mutable.LinkedHashMap[String,Any]]] ={
    val sorted = parallel.submit(new Callable[Array[mutable.LinkedHashMap[String,Any]]] {
      override def call(): Array[mutable.LinkedHashMap[String, Any]] = {
        try{
          if(selector.length == 0 ) return Array(mutable.LinkedHashMap[String,Any]("status" -> "error" ,"error"->"selectors shouldn't be empty !"))
          val dataframe = readFile(filename)
          if(dataframe == null) return Array(mutable.LinkedHashMap[String,Any]("status" -> "error","error" ->"The file doesn't exist! Please try to upload it again!"))
          val tablename:String = UUID.randomUUID().toString.replace("-","")
          dataframe.createTempView(tablename)
          var conditions = ""
          selector.foreach {
            case col: String => {
              if( col != "" ) conditions += s"$col , "
            }
          }
          if(conditions.isEmpty) return Array(mutable.LinkedHashMap[String,Any]("status" -> "error" ,"error"->"selectors shouldn't be empty !"))
          val qquery = conditions.substring(0,conditions.length-2)
          val res = spark.sql(s"select * from $tablename order by "+qquery)
          spark.catalog.dropTempView(tablename)
          schema2LinkedHashMap(res)
        }catch{
          case exception: Exception => Array(mutable.LinkedHashMap[String,Any]("status" -> "error","error" -> exception.getMessage))
        }
      }
    })
    toScala(CompletableFuture.supplyAsync(new Supplier[Array[mutable.LinkedHashMap[String, Any]]] {
      override def get(): Array[mutable.LinkedHashMap[String, Any]] = {
        sorted.get()
      }
    }))
  }

  /**
   * fucntion to add columns to the parquet file
   * @param filename
   * @param columnName
   * @param defaultVal: default value of the added column
   * @param valueType: the type of the column
   * @return
   */
  def addColumn(filename:String,columnName:String,defaultVal:Any,valueType:String):Future[String] ={
    val res = parallel.submit(new Callable[String] {
      override def call(): String = {
        try{
          val dataframe = readFile(filename)
          if(dataframe == null) return """[{"status":"error","message":"The file doesn't exist! Please try to upload it again!"}]"""

          if(defaultVal.getClass.toString == "class scala.collection.immutable.$colon$colon"){
            var newDataFrame:DataFrame= null
            if(valueType == "String") newDataFrame = dataframe.withColumn(columnName,typedLit(defaultVal.asInstanceOf[Seq[String]]))
            else if(valueType == "Integer") newDataFrame = dataframe.withColumn(columnName,typedLit(defaultVal.asInstanceOf[Seq[Int]]))
            else if(valueType == "Boolean") newDataFrame = dataframe.withColumn(columnName,typedLit(defaultVal.asInstanceOf[Seq[Boolean]]))
            else if(valueType == "Double") newDataFrame = dataframe.withColumn(columnName,typedLit(defaultVal.asInstanceOf[Seq[Double]]))
            newDataFrame.show()
            val testfile:String = UUID.randomUUID().toString + ".parquet"
            try{
              saveFile(newDataFrame,testfile)
              val directory = new Directory(new File("./"+testfile))
              directory.deleteRecursively()
            }catch{
              case exception: SparkException => {
                val directory = new Directory(new File("./"+testfile))
                directory.deleteRecursively()
                return s"""[{"status":"error","message":"Type Incompatibility !"]"""
              }
            }
            saveFile(newDataFrame,filename)
            "added"
          }else if(defaultVal.getClass.toString.contains("Map")){
            println("okkskk")
            var newDataFrame:DataFrame = null
            if(valueType == "String") newDataFrame = dataframe.withColumn(columnName,typedLit(defaultVal.asInstanceOf[Map[String,String]]))
            else if(valueType == "Integer") newDataFrame = dataframe.withColumn(columnName,typedLit(defaultVal.asInstanceOf[Map[String,Int]]))
            else if(valueType == "Double") newDataFrame = dataframe.withColumn(columnName,typedLit(defaultVal.asInstanceOf[Map[String,Double]]))
            else if(valueType == "Boolean") newDataFrame = dataframe.withColumn(columnName,typedLit(defaultVal.asInstanceOf[Map[String,Boolean]]))
            newDataFrame.show()
            saveFile(newDataFrame,filename)
            "added"
          }
          else{
            val newDataFrame = dataframe.withColumn(columnName,typedLit(defaultVal))
            newDataFrame.show()
            saveFile(newDataFrame,filename)
            "added"
          }

        }catch {
          case ex:Exception => s"""[{"status":"error","message":"${ex.getMessage}"]"""
        }
      }
    })
    toScala(CompletableFuture.supplyAsync(new Supplier[String] {
      override def get(): String = {
        res.get()
      }
    }))
  }

  /**
   * function to delete rows from parquet files
   * @param filename
   * @param columnName
   * @return
   */
  def deleteColumn(filename:String,columnName:String): Future[String] ={
    val res = parallel.submit(new Callable[String] {
      override def call(): String = {
        try{
          val dataframe:DataFrame = readFile(filename)
          if(dataframe == null) return """[{"status":"error","message":"The file doesn't exist! Please try to upload it again!"}]"""
          val _ = dataframe(columnName)
          val newDf = dataframe.drop(columnName)
          newDf.show
          saveFile(newDf,filename)
          "deleted"
        }catch {
          case ex:Exception => s"""[{"status":"error","message":"${ex.getMessage}"]"""
        }
      }
    })
    toScala(CompletableFuture.supplyAsync(new Supplier[String] {
      override def get(): String = {
        res.get()
      }
    }))
  }

  /**
   * function to return zip file that contains the parquet file and then it will be sent to the user to download it
   * @param filename
   * @return the zip file
   */
  def downloadData(filename:String): File ={
    import java.io.{ BufferedInputStream, FileInputStream, FileOutputStream }
    import java.util.zip.{ ZipEntry, ZipOutputStream }

    val dataframe = readFile(filename).cache()
    dataframe.show(10)
    saveFile(dataframe, filename)
    val zip = new ZipOutputStream(new FileOutputStream(filename+".zip"))
    val folder = new File("./"+filename)
    var files: List[File] = List[File]()
    if (folder.exists && folder.isDirectory) {
      files = folder.listFiles.filter(_.isFile).toList
    }
    files.foreach { name =>
      zip.putNextEntry(new ZipEntry(name.getName))
      val in = new BufferedInputStream(new FileInputStream(name))
      var b = in.read()
      while (b > -1) {
        zip.write(b)
        b = in.read()
      }
      in.close()
      zip.closeEntry()
    }
    zip.close()
    new File("./"+filename+".zip")
  }

  /**
   * function to delete the local temporary parquet files
   * @param filename
   * @return
   */
  def deleteParquetFiles(filename:String): Future[String] ={
    Future{
      val directory = new Directory(new File("./"+filename))
      directory.deleteRecursively()
      "done"
    }
  }

  /**
   * function to delete the zip file
   * @param filename
   * @return
   */
  def deleteZipFile(filename:String): Future[Boolean] ={
    Future{
      val zipfile = new File("./"+filename+".zip")
      zipfile.delete()
    }
  }

}
