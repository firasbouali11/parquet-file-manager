package com.cognira.datalake
import com.azure.storage.common.StorageSharedKeyCredential
import com.azure.storage.file.datalake.DataLakeFileSystemClient
import com.azure.storage.file.datalake.DataLakeServiceClient
import com.azure.storage.file.datalake.DataLakeServiceClientBuilder
import com.cognira.api.utils.{readFile, saveFile}
import org.apache.spark.sql.DataFrame

import java.io.{File, FileOutputStream}
import scala.tools.reflect.WrappedProperties.AccessControl.envOrElse


object datalakeDriver{


  /**
   * function to connect to azure data lake
   * @return
   */
  def connectADL:DataLakeServiceClient ={
    val accountName = envOrElse("accountName","dldevcognira")
    val accountKey = envOrElse("accountKey","35gR/vgzsz6GX+0aRltenaNjNgbdI+sXpTwle8Cw3GE9jAlDl65GkcgwEx72153ozNoheACCJqo6FRAPZGH6zw==")

    val creds :StorageSharedKeyCredential = new StorageSharedKeyCredential(accountName,accountKey)
    val builder = new DataLakeServiceClientBuilder
    builder.credential(creds)
    builder.endpoint("https://" + accountName + ".dfs.core.windows.net")
    println("connected successfully")
    builder.buildClient()
  }

  /**
   * function to return the file system of the data lake
   * @param client
   * @param filesystem
   * @return
   */
  def getFileSystem(client:DataLakeServiceClient,filesystem:String): DataLakeFileSystemClient ={
    val fileSystemClient = client.getFileSystemClient(filesystem)
    fileSystemClient
  }

  /**
   * function to write the parquet file to the data lake
   * @param fileSystemClient: file system
   * @param from: local parquet file path
   * @param to: path of the new file in the data lake
   */
  def writeToADL(fileSystemClient:DataLakeFileSystemClient,from:String,to:String): Unit ={
    fileSystemClient.getFileClient(to).delete()
    fileSystemClient.getFileClient(to).uploadFromFile(from,true)
    println("upload done")
  }

  /**
   * function to read parquet files directly from the data lake
   * @param filename
   * @param fileSystemClient
   * @param filepath
   * @return
   */
  def readFromADL(filename:String,fileSystemClient: DataLakeFileSystemClient,filepath:String): DataFrame ={
    try{
      val dlFile = fileSystemClient.getFileClient(filepath)
      val localFile = new File(filename)
      val targetStream = new FileOutputStream(localFile)
      dlFile.read(targetStream)
      targetStream.close
      val dataframe = readFile(filename)
      dataframe.show(10)
      saveFile(dataframe,filename)
      dataframe
    }catch{
      case ex:Exception => {
        println(ex.getMessage)
        null
      }
    }
  }

}
