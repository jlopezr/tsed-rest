import {Controller, Get, PathParams, BodyParams, Post, $log, Inject, callHook} from "@tsed/common";
import {Calendar} from '../models/Calendar';
import {MongooseService, MongooseModel} from "@tsed/mongoose";
import { CalendarService } from "../services/CalendarService";

@Controller("/calendars")
export class CalendarCtrl {



  constructor(
      private cal: CalendarService,
      mongoose: MongooseService,
      @Inject(Calendar) private model: MongooseModel<Calendar>) {
    const db1 = mongoose.get(); // OR mongooseService.get("default");
    const db2 = mongoose.get('db2');
  }

  @Get()
  async findAll(): Promise<Calendar[]> {
    const list = await this.model.find({}).exec();
    $log.info(list);
    return list;
  }

  @Get("/perruchi")
  perruchi(): string {
    var txt = "";
    if($log.isLevelEnabled("debug")) {
      txt = "SI HAY DEBUG";
    } else {
      txt = "NO HAY DEBUG";
    }

    $log.fatal("FATAL");
    $log.error("ERROR");
    $log.warn("WARN");
    $log.info("INFO");
    $log.debug("DEBUG");
    return `HOLA PERRUCHI. ${txt}`;
  }

  @Get("/service")
  service(): String {
    return this.cal.sayHello();
  }

  @Get("/:id")
  async get(
    @PathParams("id") id: string
  ): Promise<Calendar> {
    return {
      _id: id,
      name: "test",
      owner: "juan"
    };
  }

  @Post()
  async update(@BodyParams("calendar") calendar: Calendar): Promise<Calendar> {
    var c = new Calendar();
    c.name = "TEST";
    c.owner = "juan";


    const doc = new this.model(c);
    await doc.save();

    return c;
  }

}