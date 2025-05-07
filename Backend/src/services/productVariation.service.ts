import Product from '../db/model/Product.model';
import ProductVariation from '../db/model/ProductVariation.model';
import ProductVariationValue from '../db/model/ProductVariationValue.model';
import VariationValue from '../db/model/VariationValue.model';
import VariationOption from '../db/model/VariationOption.model';
import { BlobServiceClient } from '@azure/storage-blob';
import fs from 'fs';
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error('La cadena de conexión de Azure Blob Storage no está configurada.');
}

async function uploadImageToAzure(blobName: string, filePath: string): Promise<string> {
  try {
    // Crear un cliente de servicio de blob
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING!);

    // Obtener el cliente del contenedor
    const containerName = 'imagenes-variaciones';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Verificar si el contenedor existe, si no, crearlo
    const exists = await containerClient.exists();
    if (!exists) {
      await containerClient.create();
      console.log(`Contenedor '${containerName}' creado.`);
    }

    // Crear un cliente de blob
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Leer el archivo desde el sistema de archivos
    const stream = fs.createReadStream(filePath);

    // Subir el archivo al blob
    await blockBlobClient.uploadStream(stream);
    console.log(`Archivo subido a Azure Blob Storage: ${blockBlobClient.url}`);

    // Devolver la URL del blob
    return blockBlobClient.url;
  } catch (error) {
    console.error('Error al subir la imagen a Azure:', error);
    throw new Error('No se pudo subir la imagen a Azure');
  }
}

export const createProductVariation = async (productVariationData: {
  productId: number;
  name: string;
  price: number;
  stock: number;
  imageFilePath: string; // Ruta del archivo de imagen
  imageFileName: string; // Nombre del archivo de imagen
}) => {
  let imageUrl: string;

  try {
    const blobName = `${Date.now()}-${productVariationData.imageFileName}`;
    imageUrl = await uploadImageToAzure(blobName, productVariationData.imageFilePath);
  } catch (error) {
    console.error('Error al subir la imagen a Azure:', error);
    throw new Error('No se pudo subir la imagen a Azure');
  }

  return await ProductVariation.create({
    productId: productVariationData.productId,
    name: productVariationData.name,
    price: productVariationData.price,
    stock: productVariationData.stock,
    imageUrl, // Guardar la URL de la imagen en la base de datos
  });
};

export const getProductWithVariations = async (id: number) => {
  return await Product.findByPk(id, {
    include: [
      {
        model: ProductVariation,
        as: 'variations',
        include: [
          {
            model: ProductVariationValue,
            as: 'variationValues',
            include: [
              {
                model: VariationValue,
                as: 'variationValue',
                include: [{ model: VariationOption, as: 'option' }],
              },
            ],
          },
        ],
      },
    ],
  });
};


export const getProductById = async (productId: number) => {
  try {
    console.log('Iniciando búsqueda de producto en la base de datos...');

    // Buscar el producto por su ID
    const product = await Product.findByPk(productId, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir columnas innecesarias
    });

    if (!product) {
      console.log(`No se encontró el producto con ID: ${productId}`);
      throw new Error('Producto no encontrado');
    }

    console.log('Producto base encontrado, buscando variaciones...');

    // Buscar las variaciones del producto
    const variations = await ProductVariation.findAll({
      where: { productId: product.id },
      attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir columnas innecesarias
      include: [
        {
          model: ProductVariationValue,
          as: 'variationValues',
          attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir columnas innecesarias
          include: [
            {
              model: VariationValue,
              as: 'variationValue',
              attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir columnas innecesarias
              include: [
                {
                  model: VariationOption,
                  as: 'option',
                  attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir columnas innecesarias
                },
              ],
            },
          ],
        },
      ],
    });

    console.log('Variaciones encontradas:', variations.length);

    // Construir el objeto de respuesta
    const result = {
      product: {
        ...product.get({ plain: true }),
        variations: await Promise.all(
          variations.map(async (variation) => ({
            ...variation.get({ plain: true }),
            variationValues: await Promise.all(
              (variation.variationValues || []).map(async (value) => ({
                ...value.get({ plain: true }),
                variationValue: {
                  ...(await VariationValue.findByPk(value.variationValueId, {
                    include: [{ model: VariationOption, as: 'option' }],
                  }))?.get({ plain: true }),
                },
              }))
            ),
          }))
        ),
      },
    };

    console.log('Datos completos preparados para enviar');
    return result;
  } catch (error) {
    console.error('Error en ProductService:', error);
    throw error;
  }
};
export const getAllProductsWithVariations = async () => {
  try {
    console.log('Iniciando búsqueda de todos los productos en la base de datos...');

    // Buscar todos los productos
    const products = await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir columnas innecesarias
    });

    if (!products || products.length === 0) {
      console.log('No se encontraron productos en la base de datos.');
      throw new Error('No se encontraron productos.');
    }

    console.log(`Productos encontrados: ${products.length}`);

    // Construir el objeto de respuesta para cada producto
    const result = await Promise.all(
      products.map(async (product) => {
        // Buscar las variaciones del producto
        const variations = await ProductVariation.findAll({
          where: { productId: product.id },
          attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir columnas innecesarias
          include: [
            {
              model: ProductVariationValue,
              as: 'variationValues',
              attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir columnas innecesarias
              include: [
                {
                  model: VariationValue,
                  as: 'variationValue',
                  attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir columnas innecesarias
                  include: [
                    {
                      model: VariationOption,
                      as: 'option',
                      attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir columnas innecesarias
                    },
                  ],
                },
              ],
            },
          ],
        });

        console.log(`Variaciones encontradas para el producto ${product.id}: ${variations.length}`);

        // Construir el objeto del producto con sus variaciones
        return {
          ...product.get({ plain: true }),
          variations: await Promise.all(
            variations.map(async (variation) => ({
              ...variation.get({ plain: true }),
              variationValues: await Promise.all(
                (variation.variationValues || []).map(async (value) => ({
                  ...value.get({ plain: true }),
                  variationValue: {
                    ...(await VariationValue.findByPk(value.variationValueId, {
                      include: [{ model: VariationOption, as: 'option' }],
                    }))?.get({ plain: true }),
                  },
                }))
              ),
            }))
          ),
        };
      })
    );

    console.log('Datos completos preparados para enviar');
    return result;
  } catch (error) {
    console.error('Error en ProductService:', error);
    throw error;
  }
};

export const getAllProductVariations = async () => {
  try {
    const variations = await ProductVariation.findAll();
    return variations;
  } catch (error) {
    throw error;
  }
};

export const getProductVariationById = async (id: number) => {
  return await ProductVariation.findByPk(id);
};

export const updateProductVariation = async (id: number, productVariationData: Partial<ProductVariation>) => {
  const productvariation = await ProductVariation.findByPk(id);
  if (!productvariation) return null;
  return await productvariation.update(productVariationData);
};

export const deleteProductVariation = async (id: number) => {
  const productvariation = await ProductVariation.findByPk(id);
  if (!productvariation) return false;
  await productvariation.destroy();
  return true;
};