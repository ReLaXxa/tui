export class CustomHttpError {
  /**
   * Returns custom error..
   *
   * @param status - The status/code of the error
   * @param message - Custom message to be showned
   * @param additionalInfo - Any additional parameters that might be useful
   *
   * @returns Object containing custom message, status code and possible additional info
   *
   */

  status!: number;
  message!: string;
  additionalInfo: string;

  constructor(
    message: string = "Internal server error",
    status: number = 500,
    additionalInfo?: any
  ) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}
