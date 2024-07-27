import { ErrorRequestHandler } from "express";


const error: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    return res.json(err.message);
  }
  res.json(err);
};

export default error