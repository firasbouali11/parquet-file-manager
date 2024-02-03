import akka.actor.ActorSystem
import akka.http.scaladsl.model.{ContentTypes, Multipart, StatusCodes}
import akka.http.scaladsl.testkit.{RouteTestTimeout, ScalatestRouteTest}
import akka.testkit.TestDuration
import com.cognira.api.routes.manager
import org.scalatest.matchers.should.Matchers
import org.scalatest.wordspec.AnyWordSpec

import java.io.File
import scala.concurrent.duration.DurationInt

class routes_test extends AnyWordSpec with Matchers with ScalatestRouteTest {
  "the service " should {
    "upload a parquet file " in {
      implicit def default(implicit system: ActorSystem) = RouteTestTimeout(new DurationInt(50).second.dilated(system))
      val file = new File("./resources/userdata1.parquet")
      val formdata = Multipart.FormData.fromFile("file",ContentTypes.`application/octet-stream`,file,10000000)

      Post("/parqfile/upload", formdata) ~> manager ~> check {
        status shouldEqual StatusCodes.OK
        responseAs[String] should fullyMatch regex """\[(\{.*\}).*\]""".r
      }
    }
  }
}
