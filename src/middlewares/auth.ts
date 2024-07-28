import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

interface CustomRequest extends Request {
    imageId?:string
}
  
  interface decodedToken {
    name:string
    imageId:string
}

const auth = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const authHeaders = req.headers['authorization']
        const token = authHeaders && authHeaders.split(' ')[1]
    
        if (!token) return res.sendStatus(401)
    
        const {imageId} = jwt.verify(token,process.env.JWT_SECRET as string) as decodedToken
    
    // only need the id to get the object from db
        req.imageId = imageId

        
        next()

    } catch (e) {
        res.status(401).send({ e: 'Authentication failed.' })
    }
};

export default auth