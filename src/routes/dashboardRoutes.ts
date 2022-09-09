import express from "express";
import {
  productsInOrders,
  fiveMostExpensiveProducts,
} from "../handlers/dashboard";

const router = express.Router();

router.route("/products_in_orders").get(productsInOrders);
router.route("/five_most_expensive_products").get(fiveMostExpensiveProducts);

export default router;
