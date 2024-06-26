import User from "../models/user";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const editUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const newData = req.body;
  try {
    const result = await User.update(userId, newData);
    res.send(result);
  } catch (e: any) {
    next(e);
  }
};

export default editUser;
