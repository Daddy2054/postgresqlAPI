import client from "../data/database";

export type Order = {
  id: string;
  status: string;
  user_id: string;
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
      throw new Error(`Could not get Order ${id}. Error: ${err}`);
    }
  }

/*
    async create(order: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (title) VALUES($1) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [order.title]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add Order ${order.title}. Error: ${err}`);
    }
  }
*/
  async delete(id: string): Promise<Order> {
    try {
      const sql = "DELETE FROM Orders WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const Order = result.rows[0];
      conn.release();
      return Order;
    } catch (err) {
      throw new Error(`Could not delete Order ${id}. Error: ${err}`);
    }
  }
  // inner join from exersice
  // select orders.id, orders.status,users.username from orders inner join users on orders.user_id=users.id;
  //solution
  //SELECT * FROM products INNER JOIN order_products ON product.id = order_products.id;
}
