import User from "../models/user";
import { Request, Response, NextFunction } from "express";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.get();
    res.send(users);
  } catch (e) {
    next(e);
  }
};

export const getChallengers = async (
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

export const findUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await User.find(userId);
    res.send(user);
  } catch (e) {
    next(e);
  }
};
