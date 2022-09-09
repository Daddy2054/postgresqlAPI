import client from "../data/database";
import { Product } from "../models/product";
import { Order } from "../models/order";

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.id";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }

  // select * from products order by price desc limit 5;
  async fiveMostExpensiveProducts(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products ORDER BY price DESC LIMIT 5;";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get five most expensive products: ${err}`);
    }
  }
}
