import express from "express";
import { Income } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const incomes = await Income.findAndCountAll({
      attributes: ["amount", "date"],
      where: { userId: req.user.id },
      order: ["date"],
    });

    return res.json(incomes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get incomes : ${error.message}` });
  }
});

router.post("/", async (req, res) => {
  const { amount, date } = req.body;

  if (!amount || !date) {
    return res.status(400).json({ message: "Please send all required fields" });
  }

  try {
    const newIncome = await Income.create(
      { ...req.body, userId: req.user.id },
      { returning: true }
    );

    return res.status(201).json({ message: "Income created", data: newIncome });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to create income : ${error.message}` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid income id" });
  }

  try {
    const foundIncome = await Income.findByPk(id);

    if (foundIncome.userId !== req.user.id) {
      return res.status(404).json({ message: "Income not found" });
    }

    return res.json(foundIncome);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to find income : ${error.message}` });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid income id" });
  }

  const { amount, date } = req.body;

  if (!amount || !date) {
    return res.status(400).json({ message: "Please send all required fields" });
  }

  try {
    const [affectedRows, updatedIncome] = await Income.update(req.body, {
      where: { userId: req.user.id, id },
      returning: true,
    });

    if (!affectedRows) {
      return res.status(404).json({ message: "Income not found" });
    }

    return res.json(updatedIncome);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to update income : ${error.message}` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid income id" });
  }

  try {
    const result = await Income.destroy({
      where: { userId: req.user.id, id },
    });

    if (!result) {
      return res.status(404).json({ message: "Income not found" });
    }

    return res.status(204).json({ message: "Income deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to delete income : ${error.message}` });
  }
});

export default router;
