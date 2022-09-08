import jwt from "jsonwebtoken";
import { User } from "../models/user";

const generateAuthToken = (authUser: User) => {
  try {
    const token = jwt.sign({ authUser }, process.env.TOKEN_SECRET as string);
    return token;
  } catch (error) {
    console.log(error);
  }
};
export default generateAuthToken;
