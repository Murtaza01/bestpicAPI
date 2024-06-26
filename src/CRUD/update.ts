import User from "../models/user";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const editUser = async (req: Request, res: Response, next: NextFunction) => {
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

export default editUser;
