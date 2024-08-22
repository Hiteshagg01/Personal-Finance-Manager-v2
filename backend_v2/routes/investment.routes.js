import { Router } from "express";
import { verifyReq } from "../middlewares/auth.middleware.js";
import {
    addInvestment,
    getInvestmentById,
    getInvestments,
    removeInvestment,
    updateInvestment,
} from "../controllers/investment.controllers.js";


const router = Router();

router
    .route("/all")
    .get(verifyReq, getInvestments)
;
    
router
    .route("/add")
    .post(verifyReq, addInvestment)

router
    .route("/:id")
    .get(verifyReq, getInvestmentById)
    .put(verifyReq, updateInvestment)
    .delete(verifyReq, removeInvestment)
;


export default router;
