import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user/userSlice";
import budgetSlice from "./budget/budgetSlice";
import expenseSlice from "./expense/expenseSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        budget: budgetSlice,
        expense: expenseSlice,
    },
});
