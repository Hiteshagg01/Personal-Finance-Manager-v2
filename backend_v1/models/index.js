import { confirm } from '@inquirer/prompts';

import sequelize from "../configs/sequelize.js";

import Budget from "./budget.js";
import Expense from "./expense.js";
import Income from "./income.js";
import Investment from "./investment.js";
import Transaction from "./transaction.js";
import User from "./user.js";

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

User.hasMany(Transaction, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});
Transaction.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

sequelize
  .authenticate()
  .then(async() => {
    console.log("✔  connection has been established successfully.");

    const ans = await confirm({message : 'force sync db?'})
    
    sequelize
      .sync({ force: ans })
      .then(() => console.log(` 👍 Data synced`))
      .catch((error) => console.error(` 👎 Error syncing database : ${error}`));
  })
  .catch((error) =>
    console.error("❌  unable to connect to the database:", error)
  );

export { Budget, Expense, Income, Investment, Transaction, User };
