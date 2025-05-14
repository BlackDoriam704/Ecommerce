import suppliers from "../db/model/suppliers.model";

export const createSupplier = async (supplierData: {
  name: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  addressId: number;
}) => {
  return await suppliers.create(supplierData);
};

export const getAllSuppliers = async () => {
  return await suppliers.findAll();
};

export const getSupplierById = async (id: number) => {
  return await suppliers.findByPk(id);
};

export const updateSupplier = async (
  id: number,
  supplierData: Partial<suppliers>
) => {
  const supplier = await suppliers.findByPk(id);
  if (!supplier) return null;
  return await supplier.update(supplierData);
};

export const deleteSupplier = async (id: number) => {
  const supplier = await suppliers.findByPk(id);
  if (!supplier) return false;
  await supplier.destroy();
  return true;
};
