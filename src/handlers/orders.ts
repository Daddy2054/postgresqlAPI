import { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";

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

OrdersRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const show = await store.show(req.params["id"]);
    res.json(show);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

const create =async (req: Request, res: Response) => {
    const order: Order = {
      id: req.body.id,
      status: req.body.status,
      content: req.body.content,
    };
    try {
      const create = await store.create(order);
      res.json(create);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }



OrdersRoutes.delete(
  "/:id",
  verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      const del = await store.delete(req.params["id"]);
      res.json(del);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

export {index,create}
