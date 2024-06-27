import User from "../models/user";
import { Request, Response, NextFunction } from "express";

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  try {
    const result = await User.delete(userId);
    if (!result?.deletedCount) {
      //todo: add status code, to the error object
      throw Error("Id Not Found");
    }
    res.send(result);
  } catch (e: any) {
    next(e);
  }
};

export default deleteUser;
