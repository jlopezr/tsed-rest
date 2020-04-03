import {BodyParams, Controller, Post, ProviderScope, Req, Scope, $log} from "@tsed/common";
import {Authenticate} from "@tsed/passport";
import { Credentials } from "../models/Credentials";

@Controller("/")
@Scope(ProviderScope.SINGLETON)
export class PassportCtrl {
  @Post("/login")
  @Authenticate("login")
  login(@Req() req: Req, @BodyParams() credentials: Credentials) {
    $log.info("LOGIN");
    $log.info(JSON.stringify(req.body));
    $log.info(`EMAIL ${credentials.email} PASS ${credentials.password}`);
    return req.user;
  }
}