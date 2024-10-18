import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "test1223";

export interface AuthRequest extends Request {
  userId?: string;
}

export const auth = (request, response, next: NextFunction) => {

    const token = request.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        response.status(404).json({message: "Token not provided" });
        return;
    } else {
        try {
            const decoded = jwt.verify(token, SECRET) as { userId: string };
            request.userId = decoded.userId;
            next();
        } catch (error) {
            response.status(404).json(error.message);
        }
    }  
};

