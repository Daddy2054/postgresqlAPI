import { Request, Response } from "express";
import { Product } from "../models/product";
import { DashboardQueries } from "../services/dashboard";

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  const products: Product[] = await dashboard.productsInOrders();
  res.json(products);
};
const fiveMostExpensiveProducts = async (_req: Request, res: Response) => {
  const products: Product[] = await dashboard.fiveMostExpensiveProducts();
  res.json(products);
};
export { productsInOrders, fiveMostExpensiveProducts };
