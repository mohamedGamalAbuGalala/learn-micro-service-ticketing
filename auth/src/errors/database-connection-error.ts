import {
  CustomError,
  SerializedFieldReturn,
} from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to database";
  statusCode = 500;
  constructor() {
    super('Error connecting to database');

    // only because we are extending a built in class (Error)
    Object.setPrototypeOf(
      this,
      DatabaseConnectionError.prototype
    );
  }

  serializeErrors(): SerializedFieldReturn[] {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
