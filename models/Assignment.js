import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const Assignment = db.define(
  "assignments",
  {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "assignments",
  }
);

export default Assignment;
