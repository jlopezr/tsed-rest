import { Req, $log } from "@tsed/common";
import { Arg, OnVerify, Protocol, OnInstall } from "@tsed/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { UsersService } from "./UsersService";
import { JWT_SECRET } from "../controllers/PassportCtrl";

@Protocol<StrategyOptions>({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
    secretOrKey: JWT_SECRET,
    //issuer: "accounts.examplesoft.com",
    //audience: "yoursite.net"
  }
})
export class JwtProtocol implements OnVerify, OnInstall {
  constructor(private usersService: UsersService) {
  }

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    //const user = await this.authService.findOne({id: jwtPayload.sub});
    //return user ? user : false;

    $log.error(`JWT: ${JSON.stringify(jwtPayload)}`);
    return true;
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
    $log.info("$onInstall JWTProtocol");
  }
}