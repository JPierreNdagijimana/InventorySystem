import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const Department = db.define(
  "department",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "departments",
  }
);

export default Department;
