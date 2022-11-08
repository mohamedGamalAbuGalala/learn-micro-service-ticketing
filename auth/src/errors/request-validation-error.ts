import type { ValidationError } from "express-validator";
import {
  CustomError,
  SerializedFieldReturn,
} from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid Request parameter"); 

    // only because we are extending a built in class (Error)
    Object.setPrototypeOf(
      this,
      RequestValidationError.prototype
    );
  }

  serializeErrors() {
    return this.errors.map(
      (err): SerializedFieldReturn => {
        return {
          message: err.msg,
          field: err.param,
        };
      }
    );
  }
}
