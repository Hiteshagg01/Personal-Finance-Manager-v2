import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const Budget = sequelize.define(
    "Budget",
    {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("category", value.toLowerCase().trim());
            },
            validate: {
                isIn: {
                    args: [["utilities", "transportation", "food", "medical", "others"]],
                    msg: "Please provide a valid category",
                },
            },
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

export default Budget;
