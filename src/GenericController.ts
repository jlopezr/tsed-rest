import { Controller, Get, PathParams, BodyParams, Post, Response} from "@tsed/common";
import { Description, Returns } from "@tsed/swagger";
import { AnyTxtRecord } from "dns";

export class GenericController<T> {
  private l: T[];
  protected model: any;

  constructor(model: any) {
    this.l = [];
    this.model = model;
  }

  @Get("/service")
  @Description("Esta funcion te dice hola desde un controlador generico")
  @Returns(200, {description: "OK", type: String})
  service(): string {
    return "SERVICE";
  }

  @Post()
  insert(@BodyParams() t: T) {
    this.l.push(t);
  }

  @Get()
  findAll(): T[] {
    return this.l;
  }

  @Get("/:id")
  find(@PathParams("id") id: number, @Response() res: Response): T {
    const result:T = this.l[id];
    if(result==null) {
      res.status(404);
    }
    return result;
  }

}