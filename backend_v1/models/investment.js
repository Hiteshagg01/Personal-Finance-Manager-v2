import { DataTypes } from "sequelize";
import sequelize from "../configs/sequelize.js";

export default sequelize.define(
  "Investment",
  {
    assetType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    purchaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    currentValue: {
      type: DataTypes.DECIMAL(10, 2),
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: false }
);
