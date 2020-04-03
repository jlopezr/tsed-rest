import { BodyParams, Controller, Post, ProviderScope, Req, Scope, $log, Get } from "@tsed/common";
import { Authenticate, Authorize } from "@tsed/passport";
import { Credentials } from "../models/Credentials";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";

const DAY = 60000 * 60 * 24;
export const TOKEN_EXP = DAY * 7;
export const JWT_SECRET = process.env.SECRET || "secret";

@Controller("/")
@Scope(ProviderScope.SINGLETON)
export class PassportCtrl {

  private async generateToken(payload: any): Promise<any> {

    return {
      token: jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXP }),
      expires: moment().add(TOKEN_EXP, 'ms').format('X')
    };
  }

  @Post("/login")
  @Authenticate("login")
  login(@Req() req: Req, @BodyParams() credentials: Credentials) {
    $log.info("LOGIN");
    $log.info(JSON.stringify(req.body));
    $log.info(`EMAIL ${credentials.email} PASS ${credentials.password}`);

    return this.generateToken(req.user);
  }

  @Get("/test")
  @Authenticate("jwt")
  test() {
    return "HOLA";
  }

}