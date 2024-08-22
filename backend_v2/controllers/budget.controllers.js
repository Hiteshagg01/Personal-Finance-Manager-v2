import moment from "moment";
import Budget from "../models/budget.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { fn, Op, where, literal } from "sequelize";


const today = new Date();

const getAllBudgets = asyncHandler(async (req, res) => {
    const budgets = await Budget.findAndCountAll({
        attributes: ["id", "category", "amount", "date"],
        where: { userId: req.user.id },
        order: [["date", "DESC"]],
    });

    return res
        .status(200)
        .json(
            new ApiResponse(200, `All budgets of ${req.user.fullName}`, budgets)
        );
});

const getCurrentBudget = asyncHandler(async (req, res) => {
    const currentBudget = await Budget.findAndCountAll({
        attributes: ["id", "category", "amount"],
        where: {
            [Op.and]: [
                where(
                    fn("EXTRACT", literal('MONTH FROM "date"')),
                    today.getMonth() + 1
                ),
                where(
                    fn("EXTRACT", literal('YEAR FROM "date"')),
                    today.getFullYear()
                ),
                { userId: req.user.id },
            ],
        },
    });

    if (!currentBudget) {
        throw new ApiError(404, "Budgets for current month is not set");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                `${req.user.fullName}'s current budget`,
                currentBudget
            )
        );
});

const addBudget = asyncHandler(async (req, res) => {
    const { category, amount, date } = req.body;

    if ([category, amount, date].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError(400, "invalid input syntax for type date");
    }

    const dateObj = new Date(date);

    const existingBudget = await Budget.findOne({
        where: {
            [Op.and]: [
                where(
                    fn("EXTRACT", literal('MONTH FROM "date"')),
                    dateObj.getMonth() + 1
                ),
                where(
                    fn("EXTRACT", literal('YEAR FROM "date"')),
                    dateObj.getFullYear()
                ),
                { category },
                { userId: req.user.id },
            ],
        },
    });

    if (existingBudget) {
        throw new ApiError(
            409,
            `${existingBudget.category} budget for ${existingBudget.date} already exist`
        );
    }

    const newBudget = await Budget.create({
        ...req.body,
        userId: req.user.id,
    });

    return res.status(201).json(new ApiResponse(201, "New budget", newBudget));
});

const getBudgetById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        throw new ApiError(400, "Invalid budget id");
    }

    const foundBudget = await Budget.findByPk(id);

    if (!foundBudget || foundBudget.userId !== req.user.id) {
        throw new ApiError(404, "Budget for specified id not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, `Budget with id : ${id}`, foundBudget));
});

const updateBudget = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        throw new ApiError(400, "Invalid budget id");
    }

    const { category, amount, date } = req.body;

    if ([category, amount, date].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError(400, "invalid input syntax for type date");
    }

    const [affectedRows, updatedBudget] = await Budget.update(req.body, {
        where: { id, userId: req.user.id },
        returning: true,
    });

    if (!affectedRows) {
        throw new ApiError(404, "Budget for specified id not found");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, "Budget updated", updatedBudget[0]));
});

const removeBudget = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        throw new ApiError(400, "Invalid budget id");
    }

    const foundBudget = await Budget.findByPk(id);

    if (!foundBudget || foundBudget.userId !== req.user.id) {
        throw new ApiError(404, "Budget for specified id not found");
    }

    await foundBudget.destroy();

    return res.status(200).json(new ApiResponse(200, "Budget deleted"));
});

export {
    getAllBudgets,
    getCurrentBudget,
    addBudget,
    getBudgetById,
    updateBudget,
    removeBudget,
};
