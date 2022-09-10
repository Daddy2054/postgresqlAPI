import bcrypt from "bcrypt";
import client from "../data/database";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  admin: boolean;
};

export class UserStore {
  async create(u: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (first_name, last_name, username, PASSWORD) \
        VALUES ($1, $2, $3, $4) \
      RETURNING \
      *;";

      const hash = bcrypt.hashSync(
        (u.password + process.env.BCRYPT_PEPPER) as string,
        parseInt(process.env.SALT_ROUNDS as string)
      );
      const values = [u.first_name, u.last_name, u.username, hash];
      const conn = await client.connect();
      const result = await conn.query(sql, values);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add user ${u.username}. Error: ${err}`);
    }
  }

  async login(username: string, password: string): Promise<User | null> {
    const sql =
      "SELECT \
    username, \
    PASSWORD \
      FROM \
    users \
      WHERE \
    username = ($1) \
";
    const conn = await client.connect();
    const result = await conn.query(sql, [username]);
    conn.release();
    if (result.rows.length) {
      const user = result.rows[0];
      if (
        bcrypt.compareSync(
          (password + process.env.BCRYPT_PEPPER) as string,
          user.password
        )
      ) {
        return user;
      }
    }
    return null;
  }

  async show(username: string): Promise<User> {
    try {
      const sql =
        "SELECT \
      * \
        FROM \
      users \
        WHERE \
      username = ($1); \
  ";
      const conn = await client.connect();
      const result = await conn.query(sql, [username]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user ${username}. Error: ${err}`);
    }
  }

  async makeAdmin(username: string): Promise<User> {
    try {
      const sql =
        "UPDATE \
      users \
  SET \
      admin = (TRUE) \
  WHERE \
      username = ($1) \
      RETURNING *; \
    ";
      const conn = await client.connect();
      const result = await conn.query(sql, [username]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not make user ${username} as admin. Error: ${err}`
      );
    }
  }

  async index(): Promise<User[]> {
    try {
      const sql = "SELECT * FROM users";
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
}
