import { DataTypes } from "sequelize";
import sequelize from "../configs/sequelize.js";

export default sequelize.define(
  "Expense",
  {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Rent", "Food", "Bills"]],
          msg: "Must be valid category",
        },
      },
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
