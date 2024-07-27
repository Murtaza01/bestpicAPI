import { Request, Response, NextFunction } from "express";
import { UploadApiResponse } from "cloudinary";
import jwt from "jsonwebtoken"
import handleUpload from "../cloudinary";
import User from "../models/user";
import { config } from "dotenv";
config();

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userObj = req.body;
    console.log(req.body, req.file);

    const token = jwt.sign(userObj,process.env.TOKEN_SECRET as string)
    
    
    
    // if file doesn't exit throw error
    if (!req.file) throw Error("please provide a file");

    const imageName = req.body.name + "'s" + " Image";
    const result = (await handleUpload(
      req.file,
      imageName
    )) as UploadApiResponse;
    userObj.imageUrl = result.secure_url;
    userObj.imageId = result.public_id;


    const user = new User(userObj);
    user.add();
    
  } catch (e: any) {
    next(e);
  }
};

export default loginUser;
