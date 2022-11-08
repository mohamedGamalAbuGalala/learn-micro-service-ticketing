import express from "express";
import { CustomError } from "../errors/custom-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .send({ errors: err.serializeErrors() });
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
