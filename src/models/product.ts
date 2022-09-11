import client from "../data/database";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};
export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql =
        " \
      SELECT \
        * \
      FROM \
        Products \
      ";
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products list. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql =
        "\
        SELECT \
          * \
        FROM \
          products \
        WHERE \
          id = ($1) \
        ";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product ${id}. Error: ${err}`);
    }
  }

  // select * from products by category;
  async productsByCategory(category: string): Promise<Product[]> {
    try {
      const sql =
        "\
      SELECT \
        * \
      FROM \
        products \
      WHERE \
        category = ($1) \
      ";
      const conn = await client.connect();
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable get products by category: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql =
        "\
      SELECT \
        * \
      FROM \
        products \
      WHERE \
        name = ($1) \
      AND \
        price = ($2) \
      ";
      const values = [product.name, product.price];
      const conn = await client.connect();
      let result = await conn.query(sql, values);
      if (!result.rows[0]) {
        const sql =
          "\
        INSERT INTO \
          products (name, price, category) \
        VALUES ($1, $2, $3) \
        RETURNING * \
        ";
        const values2 = [product.name, product.price, product.category];
        result = await conn.query(sql, values2);
      }
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product ${product.name}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql =
        "\
      DELETE FROM \
        products \
      WHERE id = ($1) \
        RETURNING * \
      ";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
