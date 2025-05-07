import { Request, Response } from 'express';
import {
  createProductVariation,
  getAllProductVariations,
  getAllProductsWithVariations,
  updateProductVariation,
  deleteProductVariation,
  getProductWithVariations,
  getProductById,
} from '../../services/productVariation.service';
import fs from 'fs';

export const addProductVariation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, name, price, stock } = req.body;

    if (!req.file) {
      res.status(400).json({ message: 'La imagen de la variación es requerida' });
      return;
    }

    console.log('Datos recibidos del cuerpo de la solicitud:', { productId, name, price, stock });
    console.log('Archivo recibido:', { path: req.file.path, originalname: req.file.originalname });

    const productVariation = await createProductVariation({
      productId: parseInt(productId, 10),
      name,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      imageFilePath: req.file.path, // Usar la ruta proporcionada por multer
      imageFileName: req.file.originalname,
    });

    // Eliminar el archivo temporal después de subirlo a Azure
    fs.unlinkSync(req.file.path);
    console.log('Archivo temporal eliminado:', req.file.path);

    res.status(201).json({ message: 'Variación creada exitosamente', productVariation });
  } catch (error) {
    console.error('Error al crear la variación de producto:', error);
    res.status(500).json({ 
      message: 'Error al crear la variación de producto', 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    });
  }
};
export const getAlltVariations = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProductVariations();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener las variaciones de producto',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};
  
export const getProductWithDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await getProductById(Number(id));
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};
export const updateProductVariationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { productId, name, price, stock, imageUrl } = req.body;
    const updatedProductVariation = await updateProductVariation(Number(id), { productId, name, price, stock, imageUrl });
    if (!updatedProductVariation) {
      res.status(404).json({ message: 'Variación de producto no encontrada' });
      return;
    }
    res.status(200).json({ message: 'Variación de producto actualizada exitosamente', updatedProductVariation });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la variación de producto', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};

export const deleteProductVariationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteProductVariation(Number(id));
    if (!deleted) {
      res.status(404).json({ message: 'Variación de producto no encontrada' });
      return;
    }
    res.status(200).json({ message: 'Variación de producto eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la variación de producto', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};
export const getProductVariationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parseInt(req.params.id);

    console.log(`Iniciando petición GET para producto ID: ${req.params.id}`);

    if (isNaN(productId)) {
      console.log(`ID de producto inválido: ${req.params.id}`);
      res.status(400).json({
        success: false,
        message: 'ID de producto inválido',
      });
      return;
    }

    const result = await getProductWithVariations(productId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
      return;
    }

    console.log('Respuesta exitosa preparada');

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error en el controlador:', error);

    const statusCode = error instanceof Error && error.message === 'Producto no encontrado' ? 404 : 500;
    const message = error instanceof Error ? error.message : 'Error interno del servidor';

    res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProductsWithVariations();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};