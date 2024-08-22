import { DataTypes } from "sequelize";
import sequelize from "../configs/sequelize.js";

export default sequelize.define(
  "Income",
  {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  { timestamps: false }
);
