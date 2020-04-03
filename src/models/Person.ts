import {Property, Required} from "@tsed/common";
import {Model, ObjectID} from "@tsed/mongoose";

@Model()
export class Person {
  @ObjectID("id")
  _id: string;

  @Required()
  name: string;

  @Required()
  surname: string;

  @Property()
  address: string;
}