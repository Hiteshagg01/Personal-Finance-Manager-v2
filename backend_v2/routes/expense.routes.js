import { Router } from "express";
import {
    addExpense,
    getCurrentExpenses,
    getExpenseById,
    getAllExpenses,
    removeExpense,
    updateExpense,
} from "../controllers/expense.controllers.js";
import { verifyReq } from "../middlewares/auth.middleware.js";


const router = Router();

router
    .route("/all")
    .get(verifyReq, getAllExpenses)

router
    .route("/current")
    .get(verifyReq, getCurrentExpenses)

router 
    .route("/add")
    .post(verifyReq, addExpense)
;

router
    .route("/:id")
    .get(verifyReq, getExpenseById)
    .put(verifyReq, updateExpense)
    .delete(verifyReq, removeExpense)
;


export default router;
