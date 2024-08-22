import moment from "moment/moment.js";
import Income from "../models/income.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { fn, literal, Op, where } from "sequelize";

const getAllIncomes = asyncHandler(async (req, res) => {
    const incomes = await Income.findAndCountAll({
        attributes: ["id", "amount", "date", "source", "description"],
        where: { userId: req.user.id },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                `All expenses of ${req.user.fullName} fetch success`,
                incomes
            )
        );
});

const getCurrentIncomes = asyncHandler(async (req, res) => {
    const today = new Date();

    const incomes = await Income.findAndCountAll({
        attributes: ["id", "source", "amount"],
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
                {userId: req.user.id}
            ],
        },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                `Current incomes of ${req.user.fullName}`,
                incomes
            )
        );
});

const addIncome = asyncHandler(async (req, res) => {
    const { source, date, amount } = req.body;

    if ([source, date, amount].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    // additional date check
    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError(400, "invalid input syntax for type date");
    }

    const newIncome = await Income.create({ ...req.body, userId: req.user.id });

    if (!newIncome) {
        throw new ApiError(
            500,
            "Something went wrong while creating new income"
        );
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                `New income of ${req.user.fullName}`,
                newIncome
            )
        );
});

const getIncomeById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        throw new ApiError(400, "Invalid income id");
    }

    const foundIncome = await Income.findByPk(id);

    if (!foundIncome || foundIncome.userId !== req.user.id) {
        throw new ApiError(404, "Income with specified id not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                `Income with ${id} of ${req.user.fullName}`,
                foundIncome
            )
        );
});

const updateIncome = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        throw new ApiError(400, "Invalid income id");
    }

    const { source, date, amount } = req.body;

    if ([source, date, amount].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    // additional date check
    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError(400, "invalid input syntax for type date");
    }

    const [affectedRows, updatedIncome] = await Income.update(req.body, {
        where: { id, userId: req.user.id },
        returning: true,
    });

    if (!affectedRows) {
        throw new ApiError(404, "Income with specified id not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Income updated", updatedIncome[0]));
});

const removeIncome = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        throw new ApiError(400, "Invalid income id");
    }

    const foundIncome = await Income.findByPk(id);

    if (!foundIncome || foundIncome.userId !== req.user.id) {
        throw new ApiError(404, "Income with specified id not found");
    }

    await foundIncome.destroy();

    return res.status(200).json(new ApiResponse(200, "Income Deleted"));
});

export { addIncome, getAllIncomes,getCurrentIncomes, getIncomeById, removeIncome, updateIncome };
