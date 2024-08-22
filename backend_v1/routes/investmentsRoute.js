import express from "express";
import { Investment } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const investments = await Investment.findAndCountAll({
      attributes: ["assetType", "amount", "purchaseDate"],
      where: { userId: req.user.id },
      order: ["purchaseDate"],
    });

    return res.json(investments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get investments : ${error.message}` });
  }
});

router.post("/", async (req, res) => {
  const { assetType, amount, purchaseDate } = req.body;

  if (!assetType || !amount || !purchaseDate) {
    return res.status(400).json({ message: "Please send all required fields" });
  }

  try {
    const newInvestment = await Investment.create(
      { ...req.body, userId: req.user.id },
      { returning: true }
    );

    return res
      .status(201)
      .json({ message: "Investment created", data: newInvestment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to create investment : ${error.message}` });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid investment id" });
  }

  try {
    const foundInvestment = await Investment.findByPk(id);

    if (foundInvestment.userId !== req.user.id) {
      return res.status(404).json({ message: "Investment not found" });
    }

    return res.json(foundInvestment);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to find investment : ${error.message}` });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid investment id" });
  }

  const { assetType, amount, purchaseDate } = req.body;

  if (!assetType || !amount || !purchaseDate) {
    return res.status(400).json({ message: "Please send all required fields" });
  }

  try {
    const [affectedRows, updatedInvestment] = await Investment.update(
      req.body,
      {
        returning: true,
        where: { userId: req.user.id, id },
      }
    );

    if (!affectedRows) {
      return res.status(404).json({ message: "Investment not found" });
    }

    return res.json(updatedInvestment);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to update investment : ${error.message}` });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid investment id" });
  }

  try {
    const result = await Investment.destroy({
      where: { userId: req.user.id, id },
    });

    if (!result) {
      return res.status(404).json({ message: "Investment not found" });
    }

    return res.status(204).json({ message: "Investment deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to delete investment : ${error.message}` });
  }
});

export default router;
