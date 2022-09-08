import { Request, Response } from "express";
import generateAuthToken from "../utilities/generate_token";
import { User, UserStore } from "../models/user";

const store = new UserStore();

const register = async (req: Request, res: Response) => {
  const user: User = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    admin: req.body.admin,
  };
  //  console.log(user.username,user.password)
  try {
    const alreadyUser = await store.show(user.username);
    if (!alreadyUser) {
      const newUser = await store.create(user);
      const token = generateAuthToken(newUser);
      res.json(token);
    } else {
      throw new Error("This username is not available.");
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const auth = async (req: Request, res: Response) => {
  const user: User = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    admin: req.body.admin,
  };
  try {
    const authUser = await store.login(user.username, user.password);
    if (authUser) {
      const token = generateAuthToken(authUser);
      res.json(token);
    } else {
      return null;
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const index = await store.index();
    res.json(index);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const get = async (req: Request, res: Response) => {
  try {
    const show = await store.show(req.params["id"]);
    res.json(show);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
export { register, index, auth, get };
