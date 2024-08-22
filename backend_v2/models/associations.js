import Budget from "./budget.model.js";
import Expense from "./expense.model.js";
import Income from "./income.model.js";
import Investment from "./investment.model.js";
import User from "./user.model.js";

const associate = () => {
    User.hasMany(Budget, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });
    Budget.belongsTo(User, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });

    User.hasMany(Expense, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });
    Expense.belongsTo(User, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });

    User.hasMany(Income, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });
    Income.belongsTo(User, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });

    User.hasMany(Investment, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });
    Investment.belongsTo(User, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });
};

export default associate;
