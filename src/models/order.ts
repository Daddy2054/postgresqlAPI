import client from "../data/database";
import { Product, ProductStore } from "./product";

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
      const sql =
        " \
      SELECT \
        * \
      FROM \
        orders \
      ";
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql =
        "\
      SELECT \
        * \
      FROM \
        orders \
      WHERE \
        id=($1) \
      ";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order by ID:${id}. Error: ${err}`);
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

  async addProduct(
    order: Order,
    order_products: OrderProducts,
    product: Product
  ): Promise<OrderProducts> {
    const newOrder = await this.create(order as Order);
    const productStore = new ProductStore();
    const newProduct = await productStore.create(product as Product);
    try {
      const sql =
        " \
      INSERT INTO \
        order_products \
      (quantity, order_id, product_id) \
        VALUES($1, $2,$3) \
      RETURNING * \
      ";
      const values = [order_products.quantity, newOrder.id, newProduct.id];
      const conn = await client.connect();
      const result = await conn.query(sql, values);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${newProduct.id} to order ${newOrder.id}.  ${err}`
      );
    }
  }

  async updateProduct(order_products: OrderProducts): Promise<OrderProducts> {
    try {
      let sql;
      if (order_products.quantity === 0) {
        sql =
          "DELETE FROM order_products WHERE order_id=($1) AND product_id=($2) RETURNING *; ";
      } else {
        sql =
          "update order_products SET quantity =($3)  WHERE order_id=($1) AND product_id=($2) RETURNING *; ";
      }
      const conn = await client.connect();
      const result = await conn.query(sql, [
        order_products.order_id,
        order_products.product_id,
        order_products.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update product ${order_products.product_id} in order ${order_products.order_id}.  ${err}`
      );
    }
  }

  async completedByUser(user_id: string): Promise<Order[]> {
    try {
      const sql =
        " \
        SELECT \
          * \
        FROM \
          orders \
        WHERE \
          user_id=($1) \
        AND \
          status=('completed') \
        ";
      const conn = await client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find orders, completed by userID ${user_id}. Error: ${err}`
      );
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql =
        "\
      SELECT \
        * \
      FROM \
        orders \
      WHERE \
        user_id = ($1) \
      AND status = ('open') \
      ";
      const conn = await client.connect();
      let result = await conn.query(sql, [order.user_id]);
      if (!result.rows[0]) {
        const sql =
          "\
        INSERT INTO orders (status) \
          VALUES ('open') \
        RETURNING \
          * \
        ";
        result = await conn.query(sql);
      }
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add order. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql =
        "\
      DELETE FROM \
        orders \
      WHERE \
        id=($1) \
      RETURNING \
        * \
      ";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
