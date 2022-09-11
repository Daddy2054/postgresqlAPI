import client from "../data/database";
import { Product } from "../models/product";

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<Product[]> {
    try {
      const sql =
        " \
      SELECT \
        products.id, products.name, products.price, products.category \
      FROM products \
        INNER JOIN \
      order_products \
        ON \
      products.id = order_products.product_id \
      ";
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products in orders: ${err}`);
    }
  }

  // select * from products order by price desc limit 5;
  async fiveMostExpensiveProducts(): Promise<Product[]> {
    try {
      const sql =
        " \
        SELECT \
      * \
        FROM \
      products \
        ORDER BY \
      price \
        DESC LIMIT 5;";
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get five most expensive products: ${err}`);
    }
  }
}
function addProduct(order: any, order_products: any, product: any) {
  throw new Error("Function not implemented.");
}
