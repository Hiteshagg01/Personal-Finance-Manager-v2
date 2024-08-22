import moment from "moment/moment.js";
import Expense from "../models/expense.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { fn, literal, Op, where } from "sequelize";

const getAllExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.findAndCountAll({
        attributes: ["id", "category", "amount", "date", "description"],
        where: { userId: req.user.id },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                `All expenses of ${req.user.fullName}`,
                expenses
            )
        );
});

const getCurrentExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.findAndCountAll({
        attributes: ["id", "category", "amount"],
        where: {
            [Op.and]: [
                where(
                    fn("EXTRACT", literal('MONTH FROM "date"')),
                    moment().month() + 1
                ),
                where(
                    fn("EXTRACT", literal('YEAR FROM "date"')),
                    moment().year()
                ),
                { userId: req.user.id },
            ],
        },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                `Current expenses of ${req.user.fullName}`,
                expenses
            )
        );
});

const addExpense = asyncHandler(async (req, res) => {
    const { amount, category, date } = req.body;

    if ([amount, category, date].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError(400, "invalid input syntax for type date");
    }

    const newExpense = await Expense.create({
        ...req.body,
        userId: req.user.id,
    });

    if (!newExpense) {
        throw new ApiError(500, "Something went wrong while saving expense");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                `New expense of ${req.user.fullName}`,
                newExpense
            )
        );
});

const getExpenseById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        throw new ApiError(400, "Invalid expense id");
    }

    const foundExpense = await Expense.findByPk(id);

    if (!foundExpense || foundExpense.userId !== req.user.id) {
        throw new ApiError(404, "Expense with specified id not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                `Expense with ${id} of ${req.user.fullName}`,
                foundExpense
            )
        );
});

const updateExpense = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        throw new ApiError(400, "Invalid expense id");
    }

    const { amount, category, date } = req.body;

    if ([amount, category, date].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    // additional check for valid date
    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError(400, "invalid input syntax for type date");
    }

    const [affectedRows, updatedExpense] = await Expense.update(req.body, {
        where: { id, userId: req.user.id },
        returning: true,
    });

    if (!affectedRows) {
        throw new ApiError(404, "Expense with specified id not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Updated expense", updatedExpense[0]));
});

const removeExpense = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        throw new ApiError(400, "Invalid expense id");
    }

    const foundExpense = await Expense.findByPk(id);

    if (!foundExpense || foundExpense.userId !== req.user.id) {
        throw new ApiError(404, "Expense with specified id not found");
    }

    await foundExpense.destroy();

    return res.status(200).json(200, "Expense deleted");
});

export {
    addExpense,
    getExpenseById,
    getCurrentExpenses,
    getAllExpenses,
    removeExpense,
    updateExpense,
};
