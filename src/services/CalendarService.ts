import {Service, $log} from "@tsed/common";
import {Calendar} from "../models/Calendar";

@Service()
export class CalendarService {

  private readonly calendars: Calendar[] = [];

  constructor() {
    $log.info("Calendar Service created!");
    const c1:Calendar = new Calendar();
    c1.name = "fiestuqui";
    c1.owner = "juan";
    this.create(c1);

    const c2:Calendar = new Calendar();
    c2.name = "party";
    c2.owner = "oski";
    this.create(c2);
  }

  create(calendar: Calendar) {
    calendar._id = this.calendars.length.toString();
    this.calendars.push(calendar);
  }

  findAll(): Calendar[] {
    return this.calendars;
  }

  find(id: string): Calendar {
    return this.calendars.find(c=>c._id == id);
  }

  count(): number {
    return this.calendars.length;
  }

  sayHello(): String {
    return "Hello from the calendar service!";
  }
}