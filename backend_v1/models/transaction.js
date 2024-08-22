import { DataTypes, NOW } from "sequelize";
import sequelize from "../configs/sequelize.js";

export default sequelize.define(
  "Transaction",
  {
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["Credit", "Debit"]],
          msg: "Invalid transaction type",
        },
      },
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: NOW,
    },
  },
  { timestamps: false }
);
