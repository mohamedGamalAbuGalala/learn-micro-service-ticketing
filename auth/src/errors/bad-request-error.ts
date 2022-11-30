import {
  CustomError,
  SerializedFieldReturn,
} from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    // only because we are extending a built in class (Error)
    Object.setPrototypeOf(
      this,
      BadRequestError.prototype
    );
  }

  serializeErrors(): SerializedFieldReturn[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
