import {Property, Required} from "@tsed/common";
import {Model, ObjectID} from "@tsed/mongoose";

@Model()
export class Car {
  @ObjectID("id")
  _id: string;

  @Property()
  maker: string;

  @Property()
  model: string;

  @Required()
  plate: string;
}