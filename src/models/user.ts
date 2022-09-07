import bcrypt from "bcrypt";
import client, { saltRounds, pepper } from "../data/database";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
};

export class UserStore {
  async create(u: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (first_name,last_name,username,password) VALUES($1, $2,$3,$4) RETURNING *";
      //  console.log(u.username,u.password)
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      );
      const result = await conn.query(sql, [u.username, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add user ${u.username}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = "SELECT username,password FROM users WHERE username=($1)";
    const result = await conn.query(sql, [username]);
   // console.log(password + pepper);
    if (result.rows.length) {
      const user = result.rows[0];
    //  console.log(user);
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
}
