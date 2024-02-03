package com.cognira.api

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import com.cognira.api.routes.manager

import scala.xml.Properties.envOrElse


object main extends App {
  implicit val system :ActorSystem[Nothing] = ActorSystem(Behaviors.empty,"main")

  val port:Int = envOrElse("HOSTPORT","5050").toInt
  val host:String = envOrElse("HOSTIP","localhost")
  Http().newServerAt(host,port).bind(manager)
  println(s"server is running on port $port ==> http://$host:$port/")
}
