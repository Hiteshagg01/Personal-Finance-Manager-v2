import { configureStore } from "@reduxjs/toolkit";
import budgetSlice from "./budget/budgetSlice";
import expenseSlice from "./expense/expenseSlice";
import incomeSlice from "./income/incomeSlice";
import userSlice from "./user/userSlice";
import investmentSlice from "./investment/investmentSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        budget: budgetSlice,
        expense: expenseSlice,
        income: incomeSlice,
        investment : investmentSlice
    },
});
