import { Request, Response, NextFunction } from "express";

const notFound = (req:Request, res:Response, next:NextFunction) => {
    res.status(404).json("Sorry can't find that!");
}

export default notFound