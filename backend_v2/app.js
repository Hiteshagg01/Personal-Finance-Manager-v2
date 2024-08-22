import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "./passport/index.js";


// app configurations
const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(passport.initialize());


// route imports
import errorHandler from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.routes.js";
import budgetRouter from "./routes/budget.routes.js";
import expenseRouter from "./routes/expense.routes.js";
import incomeRouter from "./routes/income.routes.js";
import investmentRouter from "./routes/investment.routes.js";

// route declarations
app.use("/api/v2/users", userRouter);
app.use("/api/v2/budgets", budgetRouter);
app.use("/api/v2/expenses", expenseRouter);
app.use("/api/v2/incomes", incomeRouter);
app.use("/api/v2/investments", investmentRouter);

app.all("*", (req, res) => {
    res.status(404).json({message : "Sorry this location does not exist", success : false})
})

// common error handling middleware
app.use(errorHandler);


export default app;
