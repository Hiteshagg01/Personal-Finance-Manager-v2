import express from "express";
import { Budget } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.findAndCountAll({
      attributes: ["category", "amount"],
      where: { userId: req.user.id },
      order: ["startDate"],
    });

    return res.json(budgets);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get budgets : ${error.message}` });
  }
});

router.post("/", async (req, res) => {
  const { category, amount, startDate, endDate } = req.body;

  if (!category || !amount || !startDate || !endDate) {
    return res.status(400).json({ message: "Please send all required fields" });
  }

  try {
    const newBudget = await Budget.create(
      { ...req.body, userId: req.user.id },
      { returning: true }
    );

    return res.status(201).json({ message: "Budget created", data: newBudget });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to create budget : ${error.message}`,
    });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid budget id" });
  }

  try {
    const foundBudget = await Budget.findByPk(id);

    if (foundBudget.userId !== req.user.id) {
      return res.status(404).json({ message: `Budget not found` });
    }

    return res.json(foundBudget);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to find budget : ${error.message}` });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid budget id" });
  }

  const { category, amount, startDate, endDate } = req.body;

  if (!category || !amount || !startDate || !endDate) {
    return res.status(400).json({ message: "Please send all required fields" });
  }

  try {
    const [affectedRows, updatedBudget] = await Budget.update(req.body, {
      returning: true,
      where: { userId: req.user.id, id },
    });

    if (!affectedRows) {
      return res.status(404).json({ message: `Budget not found` });
    }

    return res.json(updatedBudget);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to update budget : ${error.message}` });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid budget id" });
  }

  try {
    const result = await Budget.destroy({
      where: { id, userId: req.user.id },
    });

    if (!result) {
      return res.status(404).json({ message: `Budget not found` });
    }

    return res.status(204).json({ message: "Budget deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to delete budget : ${error.message}` });
  }
});

export default router;
