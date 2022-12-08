import {
  CustomError,
  SerializedFieldReturn,
} from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not Authorized!");

    // only because we are extending a built in class (Error)
    Object.setPrototypeOf(
      this,
      NotAuthorizedError.prototype
    );
  }

  serializeErrors(): SerializedFieldReturn[] {
    return [
      {
        message: "Not Authorized!",
      },
    ];
  }
}
