import { Request, Response, NextFunction } from "express";
/**
 * The main object is to check if we are receiving the proper header for "Content-Type"
 *
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction object provided by Express
 */
export const checkHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.header("Content-Type") === "Accept: application/xml") {
    return res.status(406).json({
      status: 406,
      Message:
        'You are using the wrong "Content-Type" header. Please switch to "Accept: application/json"!',
    });
  }
  if (
    !req.header("Content-Type") ||
    req.header("Content-Type") !== "Accept: application/json"
  ) {
    return res.status(400).json({
      status: 400,
      Message: 'You need to add "Accept: application/json" header!',
    });
  }
  next();
};
