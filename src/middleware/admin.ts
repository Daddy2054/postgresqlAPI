import express, { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

const administrator = (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    admin: req.body.admin,
  };
  if (user.admin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export default administrator;
