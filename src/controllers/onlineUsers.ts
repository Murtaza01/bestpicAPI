import { Request, Response, NextFunction } from "express";
import { UploadApiResponse } from "cloudinary";
import jwt from "jsonwebtoken";
import handleUpload from "../cloudinary";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user";
import { config } from "dotenv";
import { CustomRequest } from "../middlewares/auth";

config();




export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // if file doesn't exit throw error
    if (!req.file) throw Error("please provide a file");
    const userObj: User = req.body;

    const imageName = req.body.name + "-" + new Date().toISOString();
    const image = (await handleUpload(
      req.file,
      imageName
    )) as UploadApiResponse;
    userObj.imageUrl = image.secure_url;
    userObj.imageId = image.public_id;

    const { name, imageId } = userObj;

    const token = jwt.sign({ name, imageId }, process.env.JWT_SECRET as string);

    const user = new User(userObj);
    user.add();
    res.status(200).json({ token, message: "successfully created token" });
  } catch (e: any) {
    next(e);
  }
};

export const getLoggedUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user
    res.status(200).json(user)

  } catch (e) {
    next(e);
  }
};

export const getOnlineUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.get();
    res.status(200).send(users);
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
    const userId = req.params.userId;
    const results = await User.increaseOnlineWins(userId)
    if(!results?.modifiedCount) throw Error("did not increase user wins")
    res.status(200).json({message:"successfully updated",results}) 
  } catch (e: any) {
    next(e);
  }
};

export const deleteUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) throw Error("imageId doesn't exist");

    await cloudinary.uploader.destroy(user.imageId);
    const result = await User.delete(user.imageId);
    if (!result?.deletedCount) throw Error("item couldn't be deleted from db");

    res.status(200).json({ message: "successfully deleted", result });
  } catch (e: any) {
    next(e);
  }
};
