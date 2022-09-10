import { Request, Response } from "express";
import { Order, OrderProducts, OrderStore } from "../models/order";

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const index: Order[] = await store.index();
    res.json(index);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const show: Order = await store.show(req.params["id"]);
    res.json(show);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const current = async (req: Request, res: Response) => {
  try {
    const current: Order = await store.showCurrent(req.params["id"]);
    res.json(current);
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
    const create: OrderProducts = await store.addProduct(order, order_products);
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
    const completed: Order = await store.completedByUser(order);
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
    const update: OrderProducts = await store.updateProduct(order_products);
    res.json(update);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const del: Order = await store.delete(req.params["id"]);
    res.json(del);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
export { index, add, show, update, remove, completed, current };
