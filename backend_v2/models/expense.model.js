import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const Expense = sequelize.define(
    "Expense",
    {
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("category", value.toLowerCase().trim());
            },
            validate: {
                isIn: {
                    args: [
                        [
                            "foods",
                            "transportation",
                            "communication",
                            "housing",
                            "personal Care",
                            "health",
                            "education",
                            "entertainment",
                            "debt payments",
                            "pets",
                            "others",
                        ],
                    ],
                    msg: "Please provide a valid category",
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

export default Expense;
