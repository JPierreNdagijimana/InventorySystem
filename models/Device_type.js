import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const Device_type = db.define(
  "device_types",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    prefix: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "device_types",
  }
);

export default Device_type;
