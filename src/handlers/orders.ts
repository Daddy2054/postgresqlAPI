import { Request, Response } from "express";
import { Order, OrderProducts, OrderStore } from "../models/order";
import { Product } from "../models/product";

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
    const show: Order = await store.show(parseInt(req.params["id"]));
    res.json(show);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const current = async (req: Request, res: Response) => {
  try {
    const current: Order = await store.showCurrent(parseInt(req.params["id"]));
    res.json(current);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const add = async (req: Request, res: Response) => {
  const order: Order = {
    id: req.body.order.order_id,
    status: req.body.order.status,
    user_id: req.body.order.user_id,
  };
  const order_products: OrderProducts = {
    quantity: req.body.order_products.quantity,
    order_id: req.body.order_products.order_id,
    product_id: req.body.order_products.product_id,
  };
  const product: Product = {
    id: req.body.product.id,
    name: req.body.product.name,
    price: req.body.product.price,
    category: req.body.product.category
  }
  try {
    const add: OrderProducts = await store.addProduct(order, order_products,product);
    res.json(add);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const completed = async (req: Request, res: Response) => {
  const order: Order = {
    id: 0,
    status: "",
    user_id: req.body.user_id,
  };
  try {
    const completed: Order[] = await store.completedByUser(order.user_id);
    res.json(completed);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const order_products: OrderProducts = {
    quantity: req.body.quantity,
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
    const del: Order = await store.delete(parseInt(req.params["id"]));
    res.json(del);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
export { index, add, show, update, remove, completed, current };
