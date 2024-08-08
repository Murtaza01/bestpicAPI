import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

export interface CustomRequest extends Request {
  user?: User;
}



type DecodedToken = {
  name: string;
  imageId: string;
  iat: number;
};

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];

    if (!token) throw Error("couldn't find token");

    const data = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    const user = (await User.find(data.imageId)) as User;

    // user might not be fetched from db
    if (!user) throw Error("couldn't fetch user")

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export default auth;
