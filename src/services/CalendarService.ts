import {Service, $log} from "@tsed/common";
import {Calendar} from "../models/Calendar";

@Service()
export class CalendarService {
  private readonly calendars: Calendar[] = [];

  constructor() {
    $log.warn("CALENDAR SERVICE CREATED");
  }

  create(calendar: Calendar) {
    this.calendars.push(calendar);
  }

  findAll(): Calendar[] {
    return this.calendars;
  }
}