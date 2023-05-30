import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err instanceof Error) {
    return res.status(400).send({
      errors: [{ message: err.message }],
    });
  }

  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
