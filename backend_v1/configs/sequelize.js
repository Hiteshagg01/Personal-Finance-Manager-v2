import "dotenv/config";
import { Sequelize } from "sequelize";

export default new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: process.env.DIALECT,
    // logging: false,
  }
);
