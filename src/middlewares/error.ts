import { ErrorRequestHandler } from "express";


const error: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  if (err instanceof Error) {
    return res.json(err.message);
  }
  res.json(err);
};

export default error