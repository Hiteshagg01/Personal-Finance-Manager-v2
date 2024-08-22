import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const Income = sequelize.define(
    "Income",
    {
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        source: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
        },
    },
    { timestamps: false }
);


export default Income