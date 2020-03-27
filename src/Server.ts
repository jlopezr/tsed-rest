import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";

const rootDir = __dirname;

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  debug: true,
  logger: {
    level: 'debug'
  },
  mongoose: {
    urls: {
      default: { // Recommended: define default connection. All models without dbName will be assigned to this connection
        url: "mongodb://127.0.0.1:27017/db1",
        connectionOptions: {}
      },
      db2: {
        url: "mongodb://127.0.0.1:27017/db2",
        connectionOptions: {}
      }
    }
  }
})
export class Server extends ServerLoader {
  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    this
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}