import express, { Request, Response } from "express";
import { Cart, OrderProducts } from "../models/cart";
import verifyAuthToken from "../middleware/verify_token";

const cartsRoutes = express.Router();
const cart = new Cart();

cartsRoutes.post( //add product to cart
  "/",
  // verifyAuthToken,
  async (req: Request, res: Response) => {
    const order_products: OrderProducts = {
      quantity: req.body.quantity,
      order_id: req.body.order_id,
      product_id: req.body.product_id,
    };
    try {
      const add = await cart.addProduct(order_products);
      res.json(add);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

cartsRoutes.delete( //delete product from cart
    "/",
    // verifyAuthToken,
    async (req: Request, res: Response) => {
      const order_products: OrderProducts = {
        quantity: req.body.quantity,
        order_id: req.body.order_id,
        product_id: req.body.product_id,
      };
      try {
        const del = await cart.deleteProduct(order_products);
        res.json(del);
      } catch (err) {
        res.status(400);
        res.json(err);
      }
    }
  );

export default cartsRoutes;
