import { Request, Response } from "express";
import generateAuthToken from "../utilities/generate_token";
import { User, UserStore } from "../models/user";

const store = new UserStore();

const register = async (req: Request, res: Response) => {
  const user: User = {
    id: "",
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    admin: false,
  };

  try {
    const alreadyUser: User = await store.show(user.username as string);
    if (!alreadyUser) {
      const newUser: User = await store.create(user as User);
      const token = generateAuthToken(newUser as User) as string | undefined;
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
    const authUser: User | null = await store.login(
      user.username,
      user.password
    );
    if (authUser) {
      const token = generateAuthToken(authUser as User) as string | undefined;
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
    const index: User[] = await store.index();
    res.json(index);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const get = async (req: Request, res: Response) => {
  try {
    const show: User = await store.show(req.params["id"]);
    res.json(show);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const admin = async (req: Request, res: Response) => {
  try {
    const admin: User = await store.makeAdmin(req.params["id"]);
    res.json(admin);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export { register, index, auth, get, admin };
