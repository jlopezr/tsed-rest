import {Controller, Get, PathParams, BodyParams, Post, $log} from "@tsed/common";

export class Calendar {
  id: string;
  name: string;
}

@Controller("/calendars")
export class CalendarCtrl {

  @Get()
  findAll(): string {
    return "This action returns all calendars";
  }

  @Get("/perruchi")
  perruchi(): string {
    return "HOLA PERRUCHI";
  }

  @Get("/:id")
  async get(
    @PathParams("id") id: string
  ): Promise<Calendar> {
    return {
      id,
      name: "test"
    };
  }

  @Post()
  update(@BodyParams("calendar") calendar: Calendar): Calendar {
    var txt = "";
    if($log.isLevelEnabled("debug")) {
      txt = "SI HAY DEBUG";
    } else {
      txt = "NO HAY DEBUG";
    }

    $log.error("ERROR");
    $log.warn("WARN");
    $log.info("INFO");
    $log.debug("DEBUG");

    var c = new Calendar();
    c.id = "1234";
    c.name = txt;
    return c;
  }

}