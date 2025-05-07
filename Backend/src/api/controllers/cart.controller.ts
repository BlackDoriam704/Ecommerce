import { Request, Response } from 'express';
import {
  createCart,
  addProductToCart,
  updateCartItemQuantity,
  removeProductFromCart,
  getCartDetails,
  clearCart,
} from '../../services/cart.service';

export const createNewCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).User?.id || null;
    const sessionId = (req as any).sessionID || null;
    const cart = await createCart(userId, sessionId);
    res.status(201).json(cart);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: errorMessage });
  }
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cartId, productId, quantity } = req.body;
    await addProductToCart(cartId, productId, quantity);
    res.status(200).json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: errorMessage });
  }
};

export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cartId, productId, quantity } = req.body;
    await updateCartItemQuantity(cartId, productId, quantity);
    res.status(200).json({ message: 'Cantidad actualizada' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: errorMessage });
  }
};

export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cartId, productId } = req.body;
    await removeProductFromCart(cartId, productId);
    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: errorMessage });
  }
};

export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cartId } = req.params;
    const cart = await getCartDetails(Number(cartId));
    res.status(200).json(cart);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: errorMessage });
  }
};

export const clearCartItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cartId } = req.params;
    await clearCart(Number(cartId));
    res.status(200).json({ message: 'Carrito vaciado' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: errorMessage });
  }
};