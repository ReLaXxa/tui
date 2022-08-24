import { requestHelper } from "../helpers/requestHelper";
import { NextFunction, Request, Response } from "express";
import Logger from "../configs/logger";

/**
 * Request handler for searched user's repos with branches and latest commits.
 *
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 *
 * @returns {object} Result of the request
 */
export const getUserRepos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.params.user;
  let results = new Array();

  try {
    Logger.info(`New request for user:${user}`);

    // we request the repos for the user
    let request = await requestHelper({
      method: "get",
      url: `${process.env.HOSTNAME}/users/${user}/repos`,
    });

    // we filter all repos that are forked
    let unforkedBranches = Object.values(request).filter(
      (item: any) => item.fork === false
    );
    if (unforkedBranches.length === 0) {
      Logger.info(`User:${user} has no own repos`);
      return res.json({ message: "No own repos for user " + user }).status(200);
    }
    // we loop them and gather info for the branches and the lates comits

    Logger.info(`User:${user} has ${unforkedBranches.length} own repos`);
    for (let item of Object(unforkedBranches)) {
      let branchInfo = await requestHelper({
        method: "get",
        url: `${process.env.HOSTNAME}/repos/${user}/${item.name}/branches`,
      });

      results.push({
        repositoryName: item.name,
        ownerLogin: item.owner.login,
        branchInfo,
      });
    }

    return res.json(results).status(200);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
