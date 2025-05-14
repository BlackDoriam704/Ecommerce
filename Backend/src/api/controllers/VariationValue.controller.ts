import { Request, Response } from "express";
import { validationResult } from "express-validator";
import VariationValue from "../../db/model/VariationValue.model";

export const addVariationValue = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { optionId, value } = req.body;
    const variationValue = await VariationValue.create({ optionId, value });
    res
      .status(201)
      .json({
        message: "Valor de variación creado exitosamente",
        variationValue,
      });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const getVariationValues = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const variationValues = await VariationValue.findAll();
    res.status(200).json(variationValues);
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
};

export const deleteVariationValueById = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("esto llego al controlador", req.params);
  console.log("esto llego al controlador", req.body);
  try {
    const { id } = req.params;
    const deleted = await VariationValue.destroy({ where: { id } });
    if (!deleted) {
      res.status(404).json({ message: "Valor de variación no encontrado" });
      return;
    }
    res
      .status(200)
      .json({ message: "Valor de variación eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
};

export const getVariationValuesOption = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const variationValues = await VariationValue.findAll({
      where: { optionId: id },
    });
    if (!variationValues) {
      res
        .status(404)
        .json({
          message: "No se encontraron valores de variación para esta opción",
        });
      return;
    }
    res.status(200).json(variationValues);
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
};
