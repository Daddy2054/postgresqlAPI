import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Token not verified')
  }
};
export default verifyAuthToken;
