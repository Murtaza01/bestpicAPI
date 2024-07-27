import { Request, Response, NextFunction } from "express";
import User from "../models/user";

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const challengers = await User.getChallengers();
      res.send(challengers);
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
    const result = await User.incWins(winner);
    if (!result?.modifiedCount) throw Error("No Such User in our Database");
    res.json("updated successfully");
  } catch (e) {
    next(e);
  }
};