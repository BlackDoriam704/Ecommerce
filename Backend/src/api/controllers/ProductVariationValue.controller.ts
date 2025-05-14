import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ProductVariationValue from "../../db/model/ProductVariationValue.model";

export const addProductVariationValue = async (
  
  req: Request,
  res: Response,

): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const { productVariationId, variationValueId } = req.body;
    const productVariationValue = await ProductVariationValue.create({
      productVariationId,
      variationValueId,
    });
    res.status(201).json({
      message: "Valor de variación del producto creado exitosamente",
      productVariationValue,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
        console.log("esto llego al controlador",req.body, "este fue el error", error)
  }
};

export const getProductVariationValues = async (_req: Request, res: Response): Promise<void> => {
  try {
    const productVariationValue = await ProductVariationValue.findAll();
    res.status(200).json(productVariationValue);
  } catch (error) {
    console.error(
      "Error al obtener los valores de variación del producto:",
      error
    );
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
export const deleteProductVariationValueById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await ProductVariationValue.destroy({ where: { id } });
    if (!deleted) {
      res
        .status(404)
        .json({ message: "Valor de variación del producto no encontrado" });
      return;
    }
    res.status(200).json({
      message: "Valor de variación del producto eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

