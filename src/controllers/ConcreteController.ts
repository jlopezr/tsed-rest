import { GenericController } from "../GenericController";
import { Controller, Get } from "@tsed/common";
import { Description } from "@tsed/swagger";
import { Calendar } from "../models/Calendar";

@Controller("/concrete")
export class ConcreteController extends GenericController<Calendar> {

  //@Description("Soy una descripcion modificada") //Pasa de mi cara XD
  service(): string {
    const txt = super.service();
    return `Hola! Estoy sobrecargado :D => ${txt}`;
  }

  @Get("/perruchi")
  perruchi(): string {
    return "PERRUCHI";
  }

}