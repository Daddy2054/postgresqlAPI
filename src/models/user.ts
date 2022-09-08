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
        "INSERT INTO users (first_name,last_name,username,password) VALUES($1, $2,$3,$4) RETURNING *";
      //  console.log(u.username,u.password)
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        u.password + process.env.BCRYPT_PEPPER,
        parseInt(process.env.SALT_ROUNDS as string)
      );
      const result = await conn.query(sql, [u.username, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add user ${u.username}. Error: ${err}`);
    }
  }

  async login(username: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = "SELECT username,password FROM users WHERE username=($1)";
    const result = await conn.query(sql, [username]);
   // console.log(password + pepper);
    if (result.rows.length) {
      const user = result.rows[0];
    //  console.log(user);
      if (bcrypt.compareSync(password + process.env.BCRYPT_PEPPER, user.password)) {
        return user;
      }
    }
    return null;
  }

  async show(username: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE username=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [username]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user ${username}. Error: ${err}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
}
