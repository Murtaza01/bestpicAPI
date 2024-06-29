import { Request, Response, NextFunction } from "express";
import { UploadApiResponse } from "cloudinary";
import handleUpload from "../cloudinary";
import User from "../models/user";

const addNewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userObj = req.body;
    console.log(req.body, req.file);

    // handling the image not exiting
    if (req.file) {
      const imageName = req.body.name + "'s" + " Image";
      const result = (await handleUpload(
        req.file!,
        imageName
      )) as UploadApiResponse;
      userObj.imageUrl = result.secure_url;
      userObj.imageId = result.public_id;
    }
    const user = new User(userObj);
    user.add();
    res.redirect("/user/get/all");
  } catch (e: any) {
    next(e);
  }
};

export default addNewUser;
