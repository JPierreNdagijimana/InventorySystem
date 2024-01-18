import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

const database = {
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
};

export { port, database };
