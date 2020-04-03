import { GenericController } from "../GenericController";
import { Controller, Get, Inject } from "@tsed/common";
import { Description } from "@tsed/swagger";
import { Calendar } from "../models/Calendar";

@Controller("/concrete")

export class ConcreteController extends GenericController<Calendar> {

  constructor() {
    super(Calendar); // Aqui le pasamos el modelo, estaria mas chulo con una anotacion
  }

  //@Description("Soy una descripcion modificada") //Pasa de mi cara XD
  service(): string {
    const txt = super.service();
    return `Hola! Estoy sobrecargado :D => ${txt} => ${this.model}`;
  }

  @Get("/perruchi")
  perruchi(): string {
    return "PERRUCHI";
  }

}