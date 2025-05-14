import { Request, Response } from "express";
import { validationResult } from "express-validator";
import VariationOption from "../../db/model/VariationOption.model";

export const addVariationOption = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { name } = req.body;
    const variationOption = await VariationOption.create({ name });
    res
      .status(201)
      .json({
        message: "Opción de variación creada exitosamente",
        variationOption,
      });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const getVariationOptions = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const variationOptions = await VariationOption.findAll();
    res.status(200).json(variationOptions);
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
};

export const deleteVariationOptionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await VariationOption.destroy({ where: { id } });
    if (!deleted) {
      res.status(404).json({ message: "Opción de variación no encontrada" });
      return;
    }
    res
      .status(200)
      .json({ message: "Opción de variación eliminada exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
};
