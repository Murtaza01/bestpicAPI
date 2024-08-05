import { Request, Response, NextFunction } from "express";
import User from "../models/user";

export const getLocalUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const locals = await User.getLocal();
      res.status(200).json(locals);
    } catch (e) {
      next(e);
    }
};

export const updateUserWins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const winner = req.params.winner;
    const result = await User.increaseLocalWins(winner);

    if (!result?.modifiedCount) throw Error("No Such User in our Database");
    res.status(200).json("updated successfully");
  } catch (e) {
    next(e);
  }
};