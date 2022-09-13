import client from "../data/database";
import { Product, ProductStore } from "./product";

export type Order = {
  id: number;
  status: string;
  user_id: number;
};
export type OrderProducts = {
  quantity: number;
  order_id: number;
  product_id: number;
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

  async show(id: number): Promise<Order> {
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

  async status(id: number, status: string): Promise<Order> {
    try {
      const sql =
        "\
      UPDATE \
        orders \
      SET \
        status = ($2) \
      WHERE \
        id=($1) \
        RETURNING * \
      ";
      const conn = await client.connect();
      const result = await conn.query(sql, [id, status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not set status ${status} for order by ID:${id}. Error: ${err}`);
    }
  }

  // select Current Order by user (args: user id)[token required]
  async showCurrent(user_id: number): Promise<Order> {
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
        status=('open');  \
        ";
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
    const newOrder: Order = await this.create1(order as Order);
    const productStore: ProductStore = new ProductStore();
    const newProduct: Product = await productStore.create(product as Product);
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
      let sql: string;
      let values: Array<number>;
      if (order_products.quantity === 0) {
        sql =
          " \
          DELETE FROM \
            order_products \
          WHERE \
            order_id=($1) \
          AND \
            product_id=($2) \
          RETURNING *; ";
        values = [order_products.order_id, order_products.product_id];
      } else {
        sql =
          "\
          UPDATE \
            order_products \
          SET \
            quantity =($3) \
          WHERE \
            order_id=($1) \
          AND \
            product_id=($2) \
          RETURNING *; ";
        values = [
          order_products.order_id,
          order_products.product_id,
          order_products.quantity,
        ];
      }
      const conn = await client.connect();
      const result = await conn.query(sql, values);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update product ${order_products.product_id} in order ${order_products.order_id}.  ${err}`
      );
    }
  }

  async completedByUser(user_id: number): Promise<Order[]> {
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
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find orders, completed by userID ${user_id}. Error: ${err}`
      );
    }
  }

  async create1(order: Order): Promise<Order> {
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
        INSERT INTO \
          orders \
        (user_id) \
        VALUES ( $1) \
          RETURNING * \
        ";
        result = await conn.query(sql, [order.user_id]);
      }
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add order. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql =
        "\
      DELETE FROM \
        orders \
      WHERE \
        id=($1) \
      RETURNING * \
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
