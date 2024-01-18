import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const User = db.define(
  "user",
  {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize: db, // We need to pass the connection instance
    tableName: "users",
  }
);

export default User;
