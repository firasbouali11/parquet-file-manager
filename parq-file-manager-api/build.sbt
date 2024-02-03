name := "parq_file_manager"

version := "0.1"

scalaVersion := "2.12.14"

libraryDependencies += "org.scala-lang" % "scala-library" % "2.12.14"
libraryDependencies += "org.scala-lang" % "scala-compiler" % "2.12.14"
libraryDependencies += "org.apache.spark" %% "spark-core" % "3.1.2"
libraryDependencies += "org.apache.spark" %% "spark-sql" % "3.1.2"
libraryDependencies += "org.apache.spark" %% "spark-streaming" % "3.1.2"
libraryDependencies += "com.typesafe.akka" %% "akka-stream" % "2.6.15"
libraryDependencies += "com.typesafe.akka" %% "akka-http" % "10.2.4"
libraryDependencies += "com.typesafe.akka" %% "akka-actor-typed" % "2.6.15"
libraryDependencies += "io.spray" %% "spray-json" % "1.3.6"
libraryDependencies += "com.typesafe.akka" %% "akka-http-spray-json" % "10.2.4"
libraryDependencies += "com.fasterxml.jackson.core" % "jackson-databind" % "2.12.4"
libraryDependencies += "com.fasterxml.jackson.module" %% "jackson-module-scala" % "2.12.4"
libraryDependencies += "org.scalactic" %% "scalactic" % "3.2.9"
libraryDependencies += "org.scalatest" %% "scalatest" % "3.2.9" % "test"
libraryDependencies += "com.typesafe.akka" %% "akka-testkit" % "2.6.15" % Test
libraryDependencies += "com.typesafe.akka" %% "akka-stream-testkit" % "2.6.15" % Test
libraryDependencies += "com.typesafe.akka" %% "akka-http-testkit" % "10.2.5" % Test
libraryDependencies += "ch.megard" %% "akka-http-cors" % "1.0.0"
libraryDependencies += "com.azure" % "azure-storage-file-datalake" % "12.5.1"


// [Required] Enable plugin and automatically find def main(args:Array[String]) methods from the classpath
enablePlugins(PackPlugin)

// [Optional] Specify main classes manually
// This example creates `hello` command (target/pack/bin/hello) that calls org.mydomain.Hello#main(Array[String])
packMain := Map("main" -> "com.cognira.api.main")