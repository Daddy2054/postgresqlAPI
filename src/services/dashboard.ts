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

  // select * from products by category;
  async productsByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE category=($1);";

      const result = await conn.query(sql, [category]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by category: ${err}`);
    }
  }

  // select Completed Orders by user (args: user id)[token required]
  async indexCompleted(user_id: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM Orders WHERE user_id=($1) AND status='completed'";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Orders. Error: ${err}`);
    }
  }

  // select Current Order by user (args: user id)[token required]
  async showCurrent(user_id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM Orders WHERE user_id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get current order for user ID:${user_id}. Error: ${err}`
      );
    }
  }
}
