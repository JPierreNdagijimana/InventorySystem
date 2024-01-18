import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const Role = db.define(
  "roles",
  {
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "roles",
  }
);

export default Role;
