import { Request, Response } from 'express';
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from '../../services/suppliers.service';

export const addSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, contactName, contactEmail, contactPhone, addressId } = req.body;
    const supplier = await createSupplier({ name, contactName, contactEmail, contactPhone, addressId });
    res.status(201).json({ message: 'Proveedor creado exitosamente', supplier });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el proveedor', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};

export const getSuppliers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const suppliers = await getAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proveedores', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};

export const getSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const supplier = await getSupplierById(Number(id));
    if (!supplier) {
      res.status(404).json({ message: 'Proveedor no encontrado' });
      return;
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el proveedor', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};

export const updateSupplierById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, contactName, contactEmail, contactPhone, addressId } = req.body;
    const updatedSupplier = await updateSupplier(Number(id), { name, contactName, contactEmail, contactPhone, addressId });
    if (!updatedSupplier) {
      res.status(404).json({ message: 'Proveedor no encontrado' });
      return;
    }
    res.status(200).json({ message: 'Proveedor actualizado exitosamente', updatedSupplier });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el proveedor', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};

export const deleteSupplierById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteSupplier(Number(id));
    if (!deleted) {
      res.status(404).json({ message: 'Proveedor no encontrado' });
      return;
    }
    res.status(200).json({ message: 'Proveedor eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el proveedor', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};