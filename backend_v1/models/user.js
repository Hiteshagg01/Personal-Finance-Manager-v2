import { DataTypes } from "sequelize";
import sequelize from "../configs/sequelize.js";

export default sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: {
        args: /^[a-zA-Z0-9_]+$/i, // Ensure username only contains letters, numbers, and underscores
        msg: "Username can only contain letters, numbers, and underscores",
      },
      len: {
        args: [3, 25],
        msg: "Username must be between 3 and 25 characters long",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    /* 
    validate: {
      len: {
        args: [8, 100], // Ensure password is at least 8 characters
        msg: "Password must be at least 8 characters long",
      },
      is: {
        args: "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$", //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
        msg: "Password must contain, at least one uppercase letter, one lowercase letter and one number",
      },
    },
    */
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isAlphanumeric: true,
    },
  },
});
