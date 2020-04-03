import {BodyParams, Controller, Post, ProviderScope, Req, Scope, $log} from "@tsed/common";
import {Authenticate} from "@tsed/passport";

@Controller("/")
@Scope(ProviderScope.SINGLETON)
export class PassportCtrl {
  @Post("/login")
  login(@Req() req: Req, @BodyParams("email") email: string, @BodyParams("password") password: string) {
    $log.info("LOGIN");
    $log.info(JSON.stringify(req.body));
    $log.info(`EMAIL ${email} PASS ${password}`);
    return req.user;
  }
}