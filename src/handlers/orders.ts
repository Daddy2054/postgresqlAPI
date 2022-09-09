import { Request, Response } from "express";
import { Order, OrderProducts, OrderStore } from "../models/order";

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const index = await store.index();
    res.json(index);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const show = await store.show(req.params["id"]);
    res.json(show);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const add = async (req: Request, res: Response) => {
  const order: Order = {
    id: "",
    status: "",
    user_id: req.body.user_id,
  };
  const order_products: OrderProducts = {
    quantity: req.body.quantity,
    order_id: "",
    product_id: req.body.product_id,
  };
  try {
    const create = await store.addProduct(order, order_products);
    res.json(create);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const completed = async (req: Request, res: Response) => {
  const order: Order = {
    id: "",
    status: "",
    user_id: req.body.user_id,
  };
  try {
    const completed = await store.completed(order);
    res.json(completed);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const order_products: OrderProducts = {
    quantity: 1,
    order_id: req.body.order_id,
    product_id: req.body.product_id,
  };
  try {
    const update = await store.updateProduct(order_products);
    res.json(update);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const del = await store.delete(req.params["id"]);
    res.json(del);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
export { index, add, show, update, remove, completed };
