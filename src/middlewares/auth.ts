import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

interface CustomRequest extends Request {
    user?:string,
}
  
  interface decodedToken {
    name:string
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
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as decodedToken
    
        const user = decoded.name
    
        req.user = user
        
        next()

    } catch (e) {
        res.status(401).send({ e: 'Authentication failed.' })
    }
};

export default auth