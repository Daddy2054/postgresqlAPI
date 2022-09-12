import jwt from "jsonwebtoken";
import { User } from "../models/user";

const generateAuthToken = (username: string) => {
  try {
    const token = jwt.sign(username, process.env.TOKEN_SECRET as string);
    return token;
  } catch (error) {
    console.log(error);
  }
};
export default generateAuthToken;
