import client from "../data/database";

export type Order = {
  id: string;
  status: string;
  user_id: string;
};
export type OrderProducts = {
  quantity: number;
  order_id: string;
  product_id: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM Orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Orders. Error: ${err}`);
    }
  }


  async show(id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM Orders WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order ID:${id}. Error: ${err}`);
    }
  }

  async addProduct(order_products: OrderProducts): Promise<OrderProducts> {
    try {
/* if not exist open order from current user 
(decode token and take user_id)
      create new order
      add product to that order

      */

      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2,$3) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [
        order_products.quantity,
        order_products.order_id,
        order_products.product_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${order_products.product_id} to order ${order_products.order_id}.  ${err}`
      );
    }
  }
  async deleteProduct(order_products: OrderProducts): Promise<OrderProducts> {
    try {
      const sql =
        "DELETE FROM order_products WHERE order_id=($1) AND product_id=($2) RETURNING *; ";
      const conn = await client.connect();
      const result = await conn.query(sql, [
        order_products.order_id,
        order_products.product_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete product ${order_products.product_id} to order ${order_products.order_id}.  ${err}`
      );
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql = "INSERT INTO orders (status) VALUES($1) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [order.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add order. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = "DELETE FROM Orders WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete Order ${id}. Error: ${err}`);
    }
  }

}
