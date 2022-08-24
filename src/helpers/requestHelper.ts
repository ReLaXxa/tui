const axios = require("axios");
import Logger from "../configs/logger";
import { CustomHttpError } from "./errorHelper";

/**
 * Custom interface for our request payload
 *  @param {string} method - The method that will be used - get,post,etc
 *  @param {string} url - Targeted URL for the request
 *  @param {string} headers - Optional additional headers
 *  @returns {object} Predefined options for the request
 */

interface Payload {
  method: string;
  url: string;
  headers?: object;
}

/**
 * Object with defined parameters we need to request data from GitHub
 *  @param {Payload} payload - Parsed data for the request
 *  @returns {object} Predefined options for the request
 */

export const requestHelper = async (payload: Payload) => {
  //we make the request with the parsed properties
  return await axios({
    method: payload.method,
    url: payload.url,
    headers: {
      Authorization: "token " + process.env.GIT_TOKEN,
    },
  })
    .then((res: any) => {
      return res.data;
    })

    //we build custom error message from the API information
    .catch((error: any) => {
      Logger.error(`${JSON.stringify(error)}`);
      throw new CustomHttpError(
        error.response.data.message,
        error.response.status,
        error.response.data.documentation_url
      );
    });
};
