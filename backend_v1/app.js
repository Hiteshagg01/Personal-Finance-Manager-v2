import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";

import "./models/index.js";
import budgetsRoute from "./routes/budgetsRoute.js";
import expensesRoute from "./routes/expensesRoute.js";
import incomesRoute from "./routes/incomesRoute.js";
import investmentsRoute from "./routes/investmentsRoute.js";
import authRoute from "./routes/authRoute.js";
import { checkAuth, checkUnAuth } from "./middlewares/auth.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello! there.");
});

app.use("/api/budgets", checkAuth, budgetsRoute);
app.use("/api/expenses", checkAuth, expensesRoute);
app.use("/api/incomes", checkAuth, incomesRoute);
app.use("/api/investments", checkAuth, investmentsRoute);
app.use("/api/auth", checkUnAuth, authRoute);

app.get("api/user", checkAuth, (req, res) => {
  res.json({ message: `Hello, ${req.user.firstName}`, user: req.user });
});

app.delete("api/user/logout", checkAuth, (req, res) => {
  req.logOut((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: err.message || "An error occurred during logout" });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          message: err.message || "Failed to destroy the session during logout",
        });
      }
      res.clearCookie("connect.sid");
      return res.json({ message: "Logout success" });
    });
  });
});


export default app