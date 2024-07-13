import User from "../models/user";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const newData = req.body;
    const result = await User.update(userId, newData);
    if (!result?.modifiedCount) {
      //todo: add status code, to the error object
      throw Error("Id Not Found");
    }
    res.send(result);
  } catch (e: any) {
    next(e);
  }
};

export const updateUserWins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("request is sent");
    const winner = req.params.winner;
    const result = await User.incWins(winner);
    if (!result?.modifiedCount) throw Error("No Such User in our Database");
    res.json("updated successfully");
  } catch (e) {
    next(e);
  }
};
