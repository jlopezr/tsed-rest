import { Controller, Get, PathParams, BodyParams, Post, Response, Inject, Status } from "@tsed/common";
import { Calendar } from '../models/Calendar';
import { MongooseModel } from "@tsed/mongoose";
import { Description, Returns, ReturnsArray } from "@tsed/swagger";
import { response } from "express";

@Controller("/mongo")
export class MongoCalendarCtrl {

  constructor(@Inject(Calendar) private model: MongooseModel<Calendar>) {
  }

  @Get()
  @Description("Returns all the calendars")
  @ReturnsArray(200, { description: "all the calendars in the system", type: Calendar })
  async findAll(): Promise<Calendar[]> {
    return await this.model.find({}).exec();
  }

  @Get("/:id")
  @Description("Returns a calendar by id")
  @Returns(200, {description: "The found calendar", type: Calendar})
  @Returns(404, {description: "Not found"}) //TODO No funciona :'(
  async find(@PathParams("id") id: string, @Response() res): Promise<Calendar> {
    const result = await this.model.findOne({ _id: id }).exec();

    if(result==null) {
      response.status(404);
    }
    return result;
  }

  @Post()
  @Status(201)
  @Description("Creates a new calendar")
  @Returns(201, {description: "The new created calendar with id set", type: Calendar})
  async insert(@BodyParams() calendar: Calendar): Promise<Calendar> {
    const doc = new this.model(calendar);
    return await doc.save();
  }

}