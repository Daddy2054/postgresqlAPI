import * as dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
  BCRYPT_PEPPER,
  SALT_ROUNDS,
  TOKEN_SECRET,
} = process.env;

let client: Pool;
if (ENV) {
  console.log(ENV);
  if (ENV === "dev") {
    client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    });
  }
  if (ENV === "test") {
    client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_TEST_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    });
  }
} else {
  console.log(
    "host " +
      POSTGRES_HOST +
      " database:" +
      POSTGRES_DB +
      " user:" +
      POSTGRES_USER +
      " password:" +
      POSTGRES_PASSWORD
  );
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

//@ts-ignore
export default client;
