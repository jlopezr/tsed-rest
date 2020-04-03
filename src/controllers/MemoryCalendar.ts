import { Controller, Get, PathParams, BodyParams, Response, Post, Status, JsonSchemesService, $log } from "@tsed/common";
import { Calendar } from '../models/Calendar';
import { CalendarService } from "../services/CalendarService";
import { Description, Returns, ReturnsArray } from "@tsed/swagger";

@Controller("/memory")
export class MemoryCalendarCtrl {

  constructor(private calendar: CalendarService, private jsonSchemaService: JsonSchemesService) { }

  @Get()
  @Description("Returns all the calendars")
  @ReturnsArray(200, { description: "all the calendars in the system", type: Calendar })
  findAll(): Calendar[] {
    return this.calendar.findAll();
  }

  @Get("/schema")
  schema(): string {
    const schema = this.jsonSchemaService.getSchemaDefinition(Calendar);
    return JSON.stringify(schema);
  }

  @Get("/zero")
  @Description("Returns an empty calendar")
  @Returns(200, { description: "the empty calendar", type: Calendar })
  zero(): Calendar {
    return {
      _id: "0",
      name: "test",
      owner: "juan"
    };
  }

  @Get("/:id")
  @Description("Returns a calendar by id")
  @Returns(200, {description: "The found calendar", type: Calendar})
  @Returns(404, {description: "Not found"}) //TODO No funciona :'(
  find(@PathParams("id") id: string, @Response() response: Response): Calendar {
    const result = this.calendar.find(id);

    if(result==null) {
      response.status(404);
    }
    return result;
  }

  @Post()
  @Status(201)
  @Description("Creates a new calendar")
  @Returns(201, { description: "The created calendar with the assigned id", type: Calendar })
  insert(@BodyParams() calendar: Calendar): Calendar {
    this.calendar.create(calendar);

    var result = new Calendar();
    result._id = this.calendar.count().toString();
    result.name = calendar.name;
    result.owner = calendar.owner;
    return result;
  }


}