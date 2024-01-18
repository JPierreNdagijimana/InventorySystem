import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const Device = db.define(
  "device",
  {
    model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    serial_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "devices",
  }
);

export default Device;
