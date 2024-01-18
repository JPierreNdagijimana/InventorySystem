import { Sequelize } from "sequelize";
import { database } from "./index.js";

export const db = new Sequelize(
  database.name,
  database.username,
  database.password,
  {
    host: database.host,
    dialect: database.dialect,
  }
);
