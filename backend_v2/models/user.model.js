import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue("username", value.trim());
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue("email", value.toLowerCase().trim());
        },
        validate: {
            isEmail: true,
        },
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue("fullName", value.trim());
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    loginType: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
                args: [["Email", "Google"]],
                msg: "Provide a valid login type",
            },
        },
        allowNull: false,
        defaultValue: "Email",
    },
    refreshToken: {
        type: DataTypes.STRING,
    },
});

User.beforeCreate(async (user) => {
    if (user.loginType === 'Email') {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

User.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

User.prototype.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

User.prototype.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this.id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

export default User;
