import { Request, Response, NextFunction } from "express";
import { CustomHttpError } from "../helpers/errorHelper";

/**
 * Custom error handler
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function handleError(
  err: TypeError | CustomHttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;
  console.log("we throw error", err);

  if (!(err instanceof CustomHttpError)) {
    customError = new CustomHttpError("Internal server error", 500);
  }
  res.status((customError as CustomHttpError).status).send(customError);
}

export default handleError;
