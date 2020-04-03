import { GenericController } from "../GenericController";
import { Controller, Get } from "@tsed/common";
import { Person } from "../models/Person";
import { Name } from "@tsed/swagger";
import { Metadata, methodsOf } from "@tsed/core";

//TODO Implementar una anotacion que agrupe varias (https://tsed.io/docs/authentication.html#create-your-auth-decorator)
//TODO La misma anotacion deberia modificar el metadata p.e para que el swagger mostrara los tipos
@Controller("/person")
@Name("Person")
@Reflect.metadata("ri:type", Person)  // Esto no funciona
@Reflect.metadata("ri:type2", "Person")  // Esto SI funciona
export class PersonController extends GenericController<Person> {

  constructor() {
    super(Person); //TODO Aqui le pasamos el modelo, estaria mas chulo con una anotacion (https://tsed.io/api/core/class/Metadata.html#overview)
  }

  //@Description("Soy una descripcion modificada") //Pasa de mi cara XD
  service(): string {
    const txt = super.service();
    return `Hola! Estoy sobrecargado y soy de persona :D => ${txt} => ${this.model}`;
  }

  @Get("/perruchi")
  perruchi(): string {
    return "PERRUCHI EN EL PERSON";
  }

  caca(a:number, b:string) {

  }

  @Get("/metadata")
  metadata(): string {
    Metadata.set("juan", "lopez", PersonController);
    var s = "";

// https://github.com/TypedProject/tsed/blob/v5.44.17/packages/core/src/utils/ObjectUtils.ts#L0-L0

    let result = Reflect.getMetadataKeys(PersonController);
    s += "KEYS: "+JSON.stringify(result) + "\n";

    s += "ENDPOINTS: "+ JSON.stringify(Metadata.get("endpoints", PersonController)) + "\n";   // Aqui salen los endpoints añadidos aqui
    s += "DESIGN-PARAMTYPES: "+ JSON.stringify(Metadata.get("design:paramtypes", PersonController)) + "\n";
    s += "RI-TYPE: "+ JSON.stringify(Metadata.get("ri:type", PersonController)) + "\n";
    s += "RI-TYPE2: "+ JSON.stringify(Metadata.get("ri:type2", PersonController)) + "\n";
    s += "TSED-CLASS-STORE: "+ JSON.stringify(Metadata.get("tsed:class:store", PersonController)) + "\n";
    s += "JUAN: "+ JSON.stringify(Metadata.get("juan", PersonController)) + "\n";



    return s;
  }
}