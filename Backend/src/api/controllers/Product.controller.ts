import { Request, Response } from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../../services/product.service';
const {  validationResult } = require('express-validator'); 


export const addProduct = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { name, description, categoryId, supplierId} = req.body;
    const product = await createProduct({ name, description, categoryId, supplierId});
    res.status(201).json({ message: 'Producto creado exitosamente', product });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};
/**
 * Obtener todos los productos
 */
export const getProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
      const products = await getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  };
  
  /**
   * Obtener un producto por ID
   */
  export const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await getProductById(Number(id));
      if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  };
  
  /**
   * Actualizar un producto
   */
  export const updateProductById = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
  
    try {
      const { id } = req.params;
      const { name, description, categoryId} = req.body;
      const updatedProduct = await updateProduct(Number(id), { name, description, categoryId });
      if (!updatedProduct) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Producto actualizado exitosamente', updatedProduct });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  };
  
  /**
   * Eliminar un producto
   */
  export const deleteProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await deleteProduct(Number(id));
      if (!deleted) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  };