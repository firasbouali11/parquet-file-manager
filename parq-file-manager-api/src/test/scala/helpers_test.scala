//import com.cognira.api.helpers.{addData, deleteData, getAllData, getData, maptoDataFrame, orderDataFrame, readFile, saveFile, updateData}
//import org.apache.spark.sql.DataFrame
//import org.scalatest.matchers.should.Matchers._
//import org.scalatest.wordspec.AnyWordSpec
//
//import java.nio.file.{Files, Paths}
//import scala.collection.mutable._
//
//
//class helpers_test extends AnyWordSpec {
//  val testfile:String = "./resources/userdata1.parquet"
//  var data:DataFrame = null
//  val testid:String = "45"
//  val testemail:String = "bcollins18@list-manage.com"
//  val obj:LinkedHashMap[String,Any] = LinkedHashMap("id" -> testid.toInt,"first_name" -> "Bonnie", "last_name" -> "Collins", "email" -> testemail)
//  val obj2add:LinkedHashMap[String,Any] = LinkedHashMap("id" -> 1234,"first_name" -> "firas", "last_name" -> "bouali", "email" -> "firas@gmail.com")
//  val obj2modify:LinkedHashMap[String,Any] = LinkedHashMap("id" -> 1234,"first_name" -> "firas", "last_name" -> "bouali", "email" -> "firas@cognira.com")
//
//  "the readFile function" should {
//    "return a dataframe when reading the path of the parquet file" in {
//      assert(readFile(testfile).isInstanceOf[DataFrame])
//      assert(readFile(testfile).collect().length == 1000)
//      data = readFile(testfile)
//    }
//  }
//
//  "the saveFile function" should {
//    "save the parquet file to a specific directory" in {
//      saveFile(data)
//      assert(Files.exists(Paths.get("file.parquet")))
//    }
//  }
//
//  "the getAllData function" should {
//    "return an array of Objects" in {
//      assert(getAllData.isInstanceOf[Array[LinkedHashMap[String,Any]]])
//      assert(getAllData(0)("id").isInstanceOf[Int])
//      assert(getAllData.length == 1000)
//    }
//  }
//
//  "the getData function" should {
//    "return an array of a single object after choosing the selector and the selector value" in {
//      assert(getData(Array("id","email"),Array(testid,testemail))(0)("id").asInstanceOf[Int] == obj("id").asInstanceOf[Int])
//      assert(getData(Array("first_name"),Array("Bonnie"))(0)("first_name").asInstanceOf[String]== obj("first_name").asInstanceOf[String])
//    }
//  }
//
//  "the function addData" should {
//    "return the newly added object" in {
//      var data:DataFrame = readFile("./file.parquet")
//      val added_data:DataFrame = maptoDataFrame(addData(obj2add)(0),data.schema)
//      data = readFile("./file.parquet")
//      assert(data.count() == 1001)
//      assert(data.intersect(added_data).select("id").collect()(0) == added_data.select("id").collect()(0))
//    }
//  }
//
//  "the updateData function" should {
//    "return the updated dataframe" in {
//      val a = updateData(obj2modify)(0)
//      val dataa:DataFrame = readFile("./file.parquet")
//      val modified:DataFrame = maptoDataFrame(a,data.schema)
//      assert(dataa.count() == 1001)
//      assert(dataa.intersect(modified).select("email").collect()(0) == modified.select("email").collect()(0))
//    }
//  }
//
//  "the deleteData function" should {
//    "return the deleted dataframe" in {
//      deleteData(Array("first_name"),Array("Nicole"))
//      val dataa:DataFrame = readFile("./file.parquet").cache()
////      val deleted = maptoDataFrame(getData(Array("first_name"),Array("Nicole")),data.schema)
//      assert(dataa.count() < 996)
////      assert(data.intersect(deleted).isEmpty)
//    }
//  }
//
//  "the orderedData function " should {
//    "return all the of the data sorted by the feature chosen" in {
//      val data = orderDataFrame("email")(0)("email").asInstanceOf[String]
//      assert( data startsWith "" )
//    }
//  }
//
//
//}
