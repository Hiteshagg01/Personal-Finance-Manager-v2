import express from "express";
import { Expense } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.findAndCountAll(
      { attributes: ["amount", "category"], 
        where: { userId: req.user.id },
        order: ['date']
      }
    );

    return res.json(expenses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get expenses : ${error.message}` });
  }
});

router.post("/", async (req, res) => {
  const { category, amount, date } = req.body;

  if (!category || !amount || !date) {
    return res.status(400).json({ message: "Please send all required fields" });
  }

  try {
    const newExpense = await Expense.create(
      { ...req.body, userId: req.user.id },
      { returning: true }
    );

    return res
      .status(201)
      .json({ message: "Expense created", data: newExpense });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to create expense : ${error.message}` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid expense id" });
  }

  try {
    const foundExpense = await Expense.findByPk(id);

    if (foundExpense.userId !== req.user.id) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json(foundExpense);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get expense : ${error.message}` });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid expense id" });
  }

  const { category, amount, date } = req.body;

  if (!category || !amount || !date) {
    return res.status(400).json({ message: "Please send all required fields" });
  }

  try {
    const [affectedRows, updatedExpense] = await Expense.update(req.body, {
      returning: true,
      where: { userId: req.user.id, id },
    });

    if (!affectedRows) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json(updatedExpense);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to update expense : ${error.message}` });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid expense id" });
  }

  try {
    const result = await Expense.destroy({
      where: { id, userId: req.user.id },
    });

    if (!result) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(204).json({ message: "Expense deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to delete budget : ${error.message}` });
  }
});

export default router;
