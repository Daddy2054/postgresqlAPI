import { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders();
  res.json(products);
};
const fiveMostExpensiveProducts = async (_req: Request, res: Response) => {
  const products = await dashboard.fiveMostExpensiveProducts();
  res.json(products);
};
export { productsInOrders, fiveMostExpensiveProducts };
