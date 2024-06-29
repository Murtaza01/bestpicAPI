import User from "../models/user";
import { v2 as cloudinary } from "cloudinary";

import { Request, Response, NextFunction } from "express";

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const user = await User.find(userId);
    await cloudinary.uploader.destroy(user?.imageId);
    const result = await User.delete(userId);
    res.send(result);
  } catch (e: any) {
    next(e);
  }
};

export default deleteUser;
