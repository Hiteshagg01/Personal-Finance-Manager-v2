import { Router } from "express";
import {
    addBudget,
    getBudgetById,
    getCurrentBudget,
    getAllBudgets,
    removeBudget,
    updateBudget,
} from "../controllers/budget.controllers.js";
import { verifyReq } from "../middlewares/auth.middleware.js";

const router = Router();

router
    .route("/all")
    .get(verifyReq, getAllBudgets)
;

router
    .route("/add")
    .post(verifyReq, addBudget)
;

router
    .route("/current")
    .get(verifyReq, getCurrentBudget)

router
    .route("/:id")
    .get(verifyReq, getBudgetById)
    .put(verifyReq, updateBudget)
    .delete(verifyReq, removeBudget)
;

export default router;
