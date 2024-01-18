import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const Employee = db.define(
  "employee",
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
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db, // We need to pass the connection instance
    tableName: "employees",
  }
);

export default Employee;
