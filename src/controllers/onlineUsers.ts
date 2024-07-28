import { Request, Response, NextFunction } from "express";
import { UploadApiResponse } from "cloudinary";
import jwt from "jsonwebtoken"
import handleUpload from "../cloudinary";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user";
import { config } from "dotenv";

config();

interface CustomRequest extends Request {
    imageId?:string
  }
  

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    // if file doesn't exit throw error
    if (!req.file) throw Error("please provide a file");

    const userObj:User = req.body;

    const imageName = req.body.name + "-" + new Date().toISOString();
    const result = (await handleUpload(
      req.file,
      imageName
    )) as UploadApiResponse;
    userObj.imageUrl = result.secure_url;
    userObj.imageId = result.public_id;

    const {name,imageId} = userObj

    const token = jwt.sign({name,imageId},process.env.JWT_SECRET as string)

    const user = new User(userObj);
    user.add();
    res.status(200).json({token,message:"successfully created token"})
    
  } catch (e: any) {
    next(e);
  }
};



export const verifyUser = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const id = req.imageId

    if(id){
      const userObj = await User.find(id)
      console.log(userObj);
      res.json(userObj)
    }
    
};


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
      throw Error("Id Not Found");
    }
    res.send(result);
  } catch (e: any) {
    next(e);
  }
};


export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
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