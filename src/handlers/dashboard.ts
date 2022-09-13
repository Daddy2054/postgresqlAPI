import { Request, Response } from "express";
import { Product } from "../models/product";
import { DashboardQueries } from "../services/dashboard";

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products: Product[] = await dashboard.productsInOrders();
    res.json(products);
  } catch (error) {
    throw new Error(
      `Could not execute productsInOrders method. Error: ${error}`
    );
  }
};
const fiveMostExpensiveProducts = async (_req: Request, res: Response) => {
  try {
    const products: Product[] = await dashboard.fiveMostExpensiveProducts();
    res.json(products);
  } catch (error) {
    throw new Error(
      `Could not execute fiveMostExpensiveProducts method. Error: ${error}`
    );
  }
};
export { productsInOrders, fiveMostExpensiveProducts };
