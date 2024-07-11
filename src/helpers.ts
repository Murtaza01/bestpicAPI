import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    return res.json(err.message);
  }
  res.json(err);
};
