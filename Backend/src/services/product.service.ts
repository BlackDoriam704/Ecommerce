import Product from '../db/model/Product.model';

export const createProduct = async (productData: {
  name: string;
  description: string;
  categoryId: number;
  supplierId: number;
}) => {
  return await Product.create(productData);
};

export const getAllProducts = async () => {
  return await Product.findAll();
};

export const getProductById = async (id: number) => {
  return await Product.findByPk(id);
};

export const updateProduct = async (id: number, productData: Partial<Product>) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  return await product.update(productData);
};

export const deleteProduct = async (id: number) => {
  const product = await Product.findByPk(id);
  if (!product) return false;
  await product.destroy();
  return true;
};
