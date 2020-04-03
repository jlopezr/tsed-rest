import { Controller, Get, PathParams, BodyParams, Post, $log, Inject } from "@tsed/common";
import { MongooseService, MongooseModel } from "@tsed/mongoose";
import { CalendarService } from "../services/CalendarService";
import { Description, Returns } from "@tsed/swagger";

@Controller("/basic")
export class BasicCtrl {

  constructor(private calendar: CalendarService) {}

  @Get("/logs")
  @Description("Esta funcion genera unos logs en el sistema.")
  @Returns(200,{description:"OK", type: String})
  logs(): string {
    var txt = "";
    if($log.isLevelEnabled("debug")) {
      txt = "DEBUG ESTA HABILITADO!";
    } else {
      txt = "DEBUG NO ESTA HABILITADO!";
    }

    $log.fatal("FATAL");
    $log.error("ERROR");
    $log.warn("WARN");
    $log.info("INFO");
    $log.debug("DEBUG");

    return `HOLA, ${txt}`;
  }

  @Get("/service")
  @Description("Esta funcion te dice hola desde un servicio cargado con DI")
  @Returns(200, {description: "OK", type: String})
  service(): String {
    return this.calendar.sayHello();
  }

  @Post("/json")
  @Description("Esta funcion obtiene valores del JSON")
  @Returns(200, {description: "OK", type: String})
  json(@BodyParams("email") email: string, @BodyParams("password") password: string) {
    return `EMAIL ${email} PASSWORD ${password}`;
  }
}