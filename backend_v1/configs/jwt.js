import "dotenv/config";

import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.firstName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return error;
  }
};
