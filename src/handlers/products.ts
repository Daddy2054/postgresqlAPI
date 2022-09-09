import { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const index: Product[] = await store.index();
    res.json(index);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const show: Product = await store.show(req.params["id"]);
    res.json(show);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const category = async (req: Request, res: Response) => {
  try {
    const category: Product[] = await store.productsByCategory(
      req.params["id"]
    );
    res.json(category);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const create: Product = await store.create(product);
    res.json(create);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const remove = async (req: Request, res: Response) => {
  try {
    const del: Product = await store.delete(req.params["id"]);
    res.json(del);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export { create, index, show, remove, category };
