import { GenericController } from "../GenericController";
import { Controller, Get } from "@tsed/common";
import { Car } from "../models/Car";
import { Name } from "@tsed/swagger";

//TODO Implementar una anotacion que agrupe varias (https://tsed.io/docs/authentication.html#create-your-auth-decorator)
@Controller("/car")
@Name("Car")
export class CarController extends GenericController<Car> {

  constructor() {
    super(Car); //TODO Aqui le pasamos el modelo, estaria mas chulo con una anotacion (https://tsed.io/api/core/class/Metadata.html#overview)
  }

  //@Description("Soy una descripcion modificada") //Pasa de mi cara XD
  service(): string {
    const txt = super.service();
    return `Hola! Estoy sobrecargado y soy de coche :D => ${txt} => ${this.model}`;
  }

  @Get("/perruchi")
  perruchi(): string {
    return "PERRUCHI EN EL CAR";
  }
}