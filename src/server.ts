import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./router/routes";
import { checkHeaders } from "./middlewares/headersMiddlewares";
import morganMiddleware from "./middlewares/loggerMiddleware";
import handleError from "./middlewares/errorHandlingMiddleware";
import Logger from "./configs/logger";

export async function createServer(): Promise<Express> {
  const app: Express = express();
  dotenv.config();

  app.use(morganMiddleware);
  const cors = require("cors");

  app.use(cors());
  app.use(checkHeaders);

  app.get("/", (req: Request, res: Response) => {
    Logger.info("We accessed this");
    res.send({ msg: "Hello world!" });
  });

  app.use("/github_api", routes);
  // always have the error handler last to prevent unexpected behaviour
  app.use(handleError);
  return app;
}
