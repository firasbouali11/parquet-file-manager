package com.cognira.api

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.HttpMethods.{DELETE, GET, POST, PUT}
import akka.http.scaladsl.model.{ContentTypes, HttpEntity, MediaTypes, Multipart, StatusCodes}
import akka.http.scaladsl.model.Multipart.BodyPart
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.stream.scaladsl.FileIO
import ch.megard.akka.http.cors.scaladsl.settings.CorsSettings
import com.cognira.api.helpers.{addColumn, addData, deleteColumn, deleteData, deleteParquetFiles, deleteZipFile, downloadData, getAllData, getData, orderDataFrame, parallel, readFileFromADL, saveDataToADL, showSchema, updateData}
import com.cognira.api.utils.{convertStructColumns, readFile, saveFile}
import com.cognira.datalake.datalakeDriver.connectADL
import com.fasterxml.jackson.databind.json.JsonMapper
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import org.apache.spark.sql.DataFrame
import org.json4s.jackson.Serialization
import spray.json._

import java.io.File
import java.util.UUID
import java.util.concurrent.Callable
import scala.collection.mutable
import scala.collection.mutable.LinkedHashMap
import scala.collection.immutable
import scala.concurrent.{ExecutionContextExecutor, Future}

final case class Feeder(container:Option[String],adlfilepath:Option[String],filename:Option[String],col:Option[String],selector:Option[Array[String]],selectorValue:Option[Array[String]],many:Option[Boolean])

object routes extends SprayJsonSupport with DefaultJsonProtocol{

  implicit val formats = org.json4s.DefaultFormats
  implicit val system :ActorSystem[Nothing] = ActorSystem(Behaviors.empty,"api")
  implicit val executor: ExecutionContextExecutor = system.executionContext
  implicit val jsonPath: RootJsonFormat[Feeder] = jsonFormat7(Feeder)
  val client = connectADL


  /**
   * route to read parquet files from the data lake
   */
  val readFromDataLakeRoute:Route = (post & path("dl")){
    entity(as[Feeder]){
      req => {
        val a = readFileFromADL(req.container.get,req.adlfilepath.get)
        onSuccess(a){
          resp => complete(HttpEntity(ContentTypes.`application/json`,Serialization.write(resp)))
        }
      }
    }
  }

  /**
   * route to save parquet file to the data lake
   */
  val saveToDataLakeRoute:Route = (post & path("dl" / "save")){
    entity(as[Feeder]){
      req => {
        onSuccess(saveDataToADL(req.container.get,req.filename.get,req.adlfilepath.get)){
          resp => complete(HttpEntity(ContentTypes.`application/json`,resp))
        }
      }
    }
  }

  /**
   * route to upload a parquet file from the local storage
   */
  val uploadFile:Route = (post & path("upload")){
    entity(as[Multipart.FormData]) { formData =>
      val allPartsF: Future[Map[String, Any]] = formData.parts.mapAsync[(String, Any)](3) {
        case b: BodyPart if b.name == "file" =>
          val file = File.createTempFile("upload", "tmp.parquet")
          b.entity.dataBytes.runWith(FileIO.toPath(file.toPath)).map(_ =>
            (b.name -> file))
      }.runFold(Map.empty[String, Any])((map, tuple) => map + tuple)
      var file:File = null
      allPartsF.map { allParts =>
        file = allParts("file").asInstanceOf[File]
      }
      onSuccess(allPartsF) { _ =>
        complete {
          val upload = parallel.submit(new Callable[HttpEntity.Strict](){
            override def call(): HttpEntity.Strict = {
              val filePath:String = file.toPath.toString
              val rawData = readFile(filePath)
              val filename:String = UUID.randomUUID().toString + ".parquet"
              var changedData:DataFrame = null
              try{
                changedData = convertStructColumns(rawData)
              }catch{
                case _:Exception => changedData = rawData
              }
              saveFile(changedData,filename)
              HttpEntity(ContentTypes.`application/json`,s"""{"status":"file uploaded successfully","filename":"$filename"}""")
            }
          })
          upload.get
         }
      }
    }
  }

  /**
   * route to get all the data
   */
  val getAllDataRoute:Route = (post & path("all") ){
    entity(as[Feeder]){
      feeder => onSuccess(getAllData(feeder.filename.get)) { data =>
        complete(HttpEntity(ContentTypes.`application/json`,Serialization.write(data)))
      }
    }

  }

  /**
   *route to get specific data from the file
   */
  val getDataRoute:Route = (post & path("one")){
    entity(as[Feeder]){
      feeder => {
        val data = getData(filename=feeder.filename.get,selector=feeder.selector.get,value=feeder.selectorValue.get)
        onSuccess(data) { res =>
          complete(HttpEntity(ContentTypes.`application/json`,Serialization.write(res)))
        }
      }
    }
  }

  /**
   * route to add new row to the file
   */
  val addDataRoute:Route = (post & pathEndOrSingleSlash){
    entity(as[String]){
      user => {
        val mapper = JsonMapper.builder().addModule(DefaultScalaModule).build
        val res = mapper.readValue(user, classOf[mutable.LinkedHashMap[String, Any]])
        val addedData = addData(res)
        onSuccess(addedData) {
          case "added" => complete(HttpEntity(ContentTypes.`application/json`, """[{"status":"success","message":"Data added successfully"}]"""))
          case value => complete(StatusCodes.BadRequest, HttpEntity(ContentTypes.`application/json`, value))
        }
      }
    }
  }

  /**
   * route to deleye rows from the parquet file
   */
  val deleteDataRoute:Route = (delete & pathEndOrSingleSlash){
    entity(as[Feeder]) {
      path => {
        val deleted = deleteData(path.filename.get,path.selector.get, path.selectorValue.get,path.many.get)
        onSuccess(deleted){
            case "deleted" => complete(HttpEntity(ContentTypes.`application/json`,"""[{"status":"success","message":"Data deleted successfully"}]"""))
            case "empty" => complete(StatusCodes.NotFound, HttpEntity(ContentTypes.`application/json`,"""[{"status":"error","message":"Nothing to delete"}]"""))
            case null => complete(StatusCodes.Forbidden,HttpEntity(ContentTypes.`application/json`,"""[{"status":"error","message":"There is multiple data !"}]"""))
            case value => complete(StatusCodes.BadRequest,HttpEntity(ContentTypes.`application/json`,value))
        }
      }
    }
  }

  /**
   * route to update the parquet file
   */
  val updateDataRoute:Route = (put & pathEndOrSingleSlash){
    entity(as[String]){
      user => {
        try{

          val mapper = JsonMapper.builder().addModule(DefaultScalaModule).build
          val res = mapper.readValue(user, classOf[LinkedHashMap[String,Any]])
        val updated = updateData(res)
        onSuccess(updated){
            case "updated" => complete(HttpEntity(ContentTypes.`application/json`,"""[{"status":"success","message":"Data updated successfully"}]"""))
            case "empty" => complete(StatusCodes.NotFound,HttpEntity(ContentTypes.`application/json`,"""[{"status":"error","message":"Nothing to update !"}]"""))
            case null =>  complete(StatusCodes.Forbidden, HttpEntity(ContentTypes.`application/json`,"""[{"status":"error","message":"There is multiple data !"}]"""))
            case value =>  complete(StatusCodes.BadRequest,HttpEntity(ContentTypes.`application/json`,value))
        }
        }catch{
          case e:Exception => complete(e.getMessage)
        }
      }
    }
  }

  /**
   * route to get sorted data
   */
  val sorteDataRoute:Route = (post & path("sorted")){
    entity(as[Feeder]) {
      selector => {
        onSuccess(orderDataFrame(selector.filename.get,selector.selector.get)){
          data => complete(HttpEntity(ContentTypes.`application/json`, Serialization.write(data)))
        }
      }
    }
  }

  /**
   * route to get schema of the file
   */
  val getSchemaRoute: Route = (post & path("schema")){
    entity(as[Feeder]){
      feeder =>
        onSuccess(showSchema(feeder.filename.get)){
          schema => complete(HttpEntity(ContentTypes.`application/json`,Serialization.write(schema)))
        }
    }

  }
  /**
   * route to add new column to the file
   */
  val addColumnRoute:Route = (post & path("col") ) {
        entity(as[String]){ feeder =>
          val mapper = JsonMapper.builder().addModule(DefaultScalaModule).build
          val res = mapper.readValue(feeder, classOf[LinkedHashMap[String,Any]])
          val data = addColumn(res("filename").asInstanceOf[String],res("col").asInstanceOf[String],res("default"),res("valueType").asInstanceOf[String])
          onSuccess(data){
            case "added" => complete(HttpEntity(ContentTypes.`application/json`,s"""[{"status":"success","message":"column ${res("col")} was added successfully"}]"""))
            case value => complete(StatusCodes.BadRequest,HttpEntity(ContentTypes.`application/json`,value))

          }
        }

  }
  /**
   * route to delete an existing column
   */
  val deleteColumnRoute:Route = (delete & path("col") ) {
    entity(as [Feeder]) {
      feeder =>
        val data = deleteColumn(feeder.filename.get,feeder.col.get)
        onSuccess(data) {
          case "deleted" => complete(HttpEntity(ContentTypes.`application/json`,s"""[{"status":"success","message":"column ${feeder.col.get} was deleted successfully"}]"""))
          case value => complete(StatusCodes.BadRequest,HttpEntity(ContentTypes.`application/json`,value))
        }
    }
  }

  /**
   * route to download the parquet file locally
   */
  val downloadRoute:Route = (post & path("download")){
    entity(as[Feeder]){feeder =>
      downloadData(feeder.filename.get)
      deleteParquetFiles(feeder.filename.get)
      complete(HttpEntity.fromFile(MediaTypes.`application/zip`,new File("./"+feeder.filename.get+".zip")))
    }
  }

  /**
   * route to delete the zip file generated in the server
   */
  val deleteZipFileRoute:Route = (post & path("clean")){
    entity(as[Feeder]){feeder =>
      deleteZipFile(feeder.filename.get)
      complete("done")
    }
  }

  /**
   * combine all the routes into a single endpoint
   */
  import ch.megard.akka.http.cors.scaladsl.CorsDirectives._
  val settings: CorsSettings = CorsSettings
    .defaultSettings
    .withAllowedMethods(immutable.Seq(GET, POST,DELETE,PUT))

  val manager: Route = (cors(settings) & pathPrefix("parqfile")){
    concat(saveToDataLakeRoute,readFromDataLakeRoute,uploadFile,getAllDataRoute,deleteZipFileRoute,getDataRoute,addDataRoute,downloadRoute,deleteDataRoute,updateDataRoute,sorteDataRoute,getSchemaRoute,addColumnRoute,deleteColumnRoute)
  }

}
