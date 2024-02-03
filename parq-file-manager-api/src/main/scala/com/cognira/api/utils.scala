package com.cognira.api

import com.cognira.api.helpers.spark
import org.apache.spark.sql.functions.{col, lit}
import org.apache.spark.sql.{Column, DataFrame, Row, SaveMode, functions}
import org.apache.spark.sql.types.StructType

import scala.collection.mutable
import scala.collection.mutable.ListBuffer

object utils {
  def readFile(path:String): DataFrame ={
    try{
      val parqfile = spark.read.parquet(path)
      parqfile.cache
    }catch{
      case _:Exception => null
    }
  }

  /**
   *
   * @param dataframe:Dataframe
   * @return mutable.LinkedHashMap
   * recursive function to convert the dataframe to a LinkedHashMap with taking care of the nested rows
   */
  def schema2LinkedHashMap(dataframe:DataFrame):Array[mutable.LinkedHashMap[String,Any]] = {
//    try{
      var finalArray = Vector[mutable.LinkedHashMap[String,Any]]()
    val data = dataframe.collect()
      for{r <- data }{
        var last = mutable.LinkedHashMap[String,Any]()
        for{(k,e) <- getHeader(dataframe).zip(r.toSeq)}{
          var mytype:Boolean = false
          try{
            mytype = !e.getClass.toString.contains("Row")
          }catch{
            case ex:Exception => mytype = true
          }
          if(mytype){
           last.put(k,e)
          }else{
            var s = spark.createDataFrame(spark.sparkContext.parallelize(Array(e.asInstanceOf[Row])),e.asInstanceOf[Row].schema)
            last.put(k,schema2LinkedHashMap(s)(0))
          }
        }
        finalArray = finalArray :+ last
      }
      finalArray.toArray
  }

  /**
   *
   * @param data linkedHashMap
   * @param schema schema of the file
   * @return dataframe
   * convert a LinkedHashMap to a dataframe
   */
  def maptoDataFrame(data:mutable.LinkedHashMap[String,Any],schema:StructType): DataFrame = {
    try{
      val row = spark.sparkContext.parallelize(Seq(Row.fromSeq(data.values.toSeq)))
      val df = spark.createDataFrame(row,schema)
      df
    }catch {
      case _:Exception => null
    }
  }

  /**
   *
   * @param dataframe
   * @return a vector of the file's columns
   */
  def getHeader(dataframe:DataFrame): Vector[String] ={
    val header = dataframe.dtypes.map(row => row._1).toVector
    header
  }

  /**
   *
   * @param dataframe
   * @param filename of the parquet file stored temporarly
   * function to save the parquet file to the storage system
   */
  def saveFile(dataframe: DataFrame,filename:String): Unit ={
    dataframe.write.mode(SaveMode.Overwrite).format("parquet").save(filename)
    println("parquet file saved succesfully")
  }

  /**
   *
   * @param key: a column name of the file
   * @param data: the data sent by the user (since it's sent from the user)
   * @param types: Map( column name -> column type )
   * @return
   * recursive function that digdeeper inside the mapped data and convert the types of values in a way that spark understand
   */
  def digdeeper(key:String,data:Any,types:Map[String,String]): Any ={
    data match {
      case data:List[Any] =>{
        var newList = ListBuffer[Any]()
        var i = 0;
        while(i < data.length){
          data(i) match{
            case a:List[Any]=> {
              newList+= digdeeper(key,a,types)
            }
            case a:mutable.LinkedHashMap[String,Any] => {
              newList+= digdeeper(key,a,types)
            }
            case j:Int => {
              if(types(key).contains("ArrayType(LongType")){
                newList += j.toLong
              }else if (types(key).contains("ArrayType(DoubleType")){
                println(types(key))
                newList += j.toDouble
              }else{
                newList += j
              }
            }
            case v:String => {
              if(types(key) == "TimestampType") {
                v match{
                  case s if s.matches("""[0-9]+\-[0-9]+\-[0-9]+[T* ][0-9]+:[0-9]+:[0-9]+Z*""") => {
                    println("this is a date format")
                    val dateTime = java.sql.Timestamp.valueOf(v.replace("Z","").replace("T"," "))
                    newList += dateTime
                  }
                  case _ => newList += data(i)
                }
              }
              else{
                newList += data(i)
              }
            }
            case _ => {
              newList += data(i)
            }
          }
          i = i+1
        }
        newList.toList
      }
      case l:mutable.LinkedHashMap[String,Any] => {
        var newMap = mutable.LinkedHashMap[String,Any]()
        for((k,v) <- l){
          v match{
            case v:List[Any] => {
              newMap.put(k,digdeeper(key,v,types))
            }
            case v:mutable.LinkedHashMap[String,Any] => {
              newMap.put(k,digdeeper(key,v,types))
            }
            case _ => newMap.put(k,digdeeper(key,v,types))
          }
        }
        newMap
      }
      case j:Int => {
        if(types(key) == "LongType"){
          j.toLong
        }else if (types(key) == "DoubleType"){
          println(types(key))
          j.toDouble
        }else{
          j
        }
      }
      case v:String => {
        if(types(key) == "TimestampType") {
          v match{
            case s if s.matches("""[0-9]+\-[0-9]+\-[0-9]+[T* ][0-9]+:[0-9]+:[0-9]+Z*""") => {
              println("this is a date format")
              val dateTime = java.sql.Timestamp.valueOf(v.replace("Z","").replace("T"," "))
              dateTime
            }
            case _ => v
          }
        }
        else{
          v
        }
      }
      case d => d
    }


  }

  /**
   *
   * @param data: data in a linkedHashMap format
   * @param types: schema of the file in Map foramt
   * @return the data as linkedHashMap with the modified data
   */
  def convertValues(data: mutable.LinkedHashMap[String,Any],types:Map[String,String]): mutable.LinkedHashMap[String,Any] ={
    val newUser = mutable.LinkedHashMap[String,Any]()
    for ((k,v ) <- data) {
      newUser.put(k,digdeeper(k,v,types))
    }
    newUser
  }

  /**
   *
   * @param dataframe
   * @return schema of the file in Map format
   */
  def getSchema(dataframe: DataFrame): Map[String,String] = {
    try{
      dataframe.dtypes.map(row => row).toMap[String,String]
    }catch{
      case _: Exception => Map[String,String]()
    }
  }

  /**
   *
   * @param df:DataFrame
   * @return dataframe
   * function that convert nested structType columns to MapType columns
   *
   */
  def convertStructColumns(df:DataFrame): DataFrame ={
    var newDf:DataFrame = df
    getSchema(newDf).foreach(e => {
      if(e._2.contains("Struct")){
        println(e._2)
        val index = newDf.schema.fieldIndex(e._1)
        val propSchema = newDf.schema(index).dataType.asInstanceOf[StructType]
        var columns = mutable.LinkedHashSet[Column]()
        propSchema.fields.foreach(field =>{

          columns.add(lit(field.name))
          columns.add(col(e._1+"."+ field.name))

        })

        newDf = newDf.withColumn(e._1,functions.map(columns.toSeq:_*))
      }
    })
    newDf
  }

}
