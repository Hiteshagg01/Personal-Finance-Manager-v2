import moment from "moment";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Investment from "../models/investment.model.js";

const getInvestments = asyncHandler(async (req, res) => {
    const investments = await Investment.findAndCountAll({
        attributes: ["id", "amount", "assetType", "purchaseDate"],
        where: { userId: req.user.id },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                `All investments of ${req.user.fullName}`,
                investments
            )
        );
});

const addInvestment = asyncHandler(async (req, res) => {
    const { assetType, amount, purchaseDate } = req.body;

    if ([assetType, amount, purchaseDate].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    if (!moment(purchaseDate, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError(400, "invalid input syntax for type date");
    }

    if (req.body.currentValue === "") {
        req.body.currentValue = null;
    }

    const newInvestment = await Investment.create({
        ...req.body,
        userId: req.user.id,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, "New investment", newInvestment));
});

const getInvestmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        throw new ApiError(400, "Invalid investment id");
    }

    const foundInvestment = await Investment.findByPk(id);

    if (!foundInvestment || foundInvestment.userId !== req.user.id) {
        throw new ApiError(404, "Investment with specified id not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, `Investment with ${id}`, foundInvestment));
});

const updateInvestment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        throw new ApiError(400, "Invalid investment id");
    }

    const { assetType, amount, purchaseDate } = req.body;

    if ([assetType, amount, purchaseDate].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    if (!moment(purchaseDate, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError(400, "invalid input syntax for type date");
    }

    if (req.body.currentValue === "") {
        req.body.currentValue = null;
    }

    const [affectedRows, updatedInvestment] = await Investment.update(
        req.body,
        {
            where: { id, userId: req.user.id },
            returning: true,
        }
    );

    if (!affectedRows) {
        throw new ApiError(404, "Investment with specified id not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Investment updated", updatedInvestment[0]));
});

const removeInvestment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        throw new ApiError(400, "Invalid investment id");
    }

    const foundInvestment = await Investment.findByPk(id);

    if (!foundInvestment || foundInvestment.userId !== req.user.id) {
        throw new ApiError(404, "Investment with specified id not found");
    }

    await foundInvestment.destroy();

    return res.status(200).json(new ApiResponse(200, "Investment deleted"));
});

export {
    getInvestments,
    addInvestment,
    getInvestmentById,
    updateInvestment,
    removeInvestment,
};
