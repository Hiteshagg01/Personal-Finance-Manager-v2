import { DataTypes } from "sequelize";
import sequelize from "../configs/sequelize.js";

export default sequelize.define(
  "Budget",
  {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Groceries", "Transportation", "Rent"]],
          msg: "Must be valid category",
        },
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  { timestamps: false }
);
