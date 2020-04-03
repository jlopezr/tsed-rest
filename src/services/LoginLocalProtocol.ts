import { BodyParams, Req, $log } from "@tsed/common";
import { OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { IStrategyOptions, Strategy } from "passport-local";
import { UsersService } from "../services/UsersService";
import { Credentials } from "../models/Credentials";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class LoginLocalProtocol implements OnVerify, OnInstall {
  constructor(private usersService: UsersService) {
  }

  $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials) {
    $log.info(`$on VERIFY LOCAL u:${credentials.email} p:${credentials.password}`);

    if (credentials.email === "juan" && credentials.password === "1234") {
      return { user: "juan" };
    } else {
      return false;
    }
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
    $log.info("$onInstall LoginLocalProtocol");
  }
}