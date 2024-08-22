import { Router } from "express";
import { verifyReq } from "../middlewares/auth.middleware.js";
import {
    addIncome,
    getIncomeById,
    getAllIncomes,
    removeIncome,
    updateIncome,
    getCurrentIncomes,
} from "../controllers/income.controllers.js";

const router = Router();

router
    .route("/all")
    .get(verifyReq, getAllIncomes);

router
    .route("/current")
    .get(verifyReq, getCurrentIncomes);

router
    .route("/add")
    .post(verifyReq, addIncome);

router
    .route("/:id")
    .get(verifyReq, getIncomeById)
    .put(verifyReq, updateIncome)
    .delete(verifyReq, removeIncome);

export default router;
