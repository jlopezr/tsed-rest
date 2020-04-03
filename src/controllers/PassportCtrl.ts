import {BodyParams, Controller, Post, ProviderScope, Req, Scope, $log} from "@tsed/common";
import {Authenticate} from "@tsed/passport";

@Controller("/")
@Scope(ProviderScope.SINGLETON)
export class PassportCtrl {
  @Post("/login")
  @Authenticate("login")
  login(@Req() req: Req, @BodyParams("username") username: string, @BodyParams("password") password: string) {
    $log.info("LOGIN");
    $log.info(JSON.stringify(req.body));
    $log.info(`EMAIL ${username} PASS ${password}`);
    return req.user;
  }
}