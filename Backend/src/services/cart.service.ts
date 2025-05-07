import Cart from '../db/model/Cart.model';
import CartItem from '../db/model/CartItem.model';
import Product from '../db/model/ProductVariation.model';
import DiscountCode from '../db/model/DiscountCode.model';


export const createCart = async (userId: number | null, sessionId: string | null) => {
  return await Cart.create({ userId, sessionId, status: 'active', total: 0 });
};

export const addProductToCart = async (cartId: number, productId: number, quantity: number) => {
  const product = await Product.findByPk(productId);
  if (!product || product.stock < quantity) {
    throw new Error('Stock insuficiente');
  }

  const cartItem = await CartItem.findOne({ where: { cartId, productId } });
  if (cartItem) {
    cartItem.quantity += quantity;
    cartItem.subtotal = cartItem.quantity * product.price;
    await cartItem.save();
  } else {
    await CartItem.create({
      cartId,
      productId,
      quantity,
      price: product.price,
      subtotal: quantity * product.price,
    });
  }

  await updateCartTotal(cartId);
};

export const updateCartItemQuantity = async (cartId: number, productId: number, quantity: number) => {
  const cartItem = await CartItem.findOne({ where: { cartId, productId } });
  if (!cartItem) throw new Error('Producto no encontrado en el carrito');

  const product = await Product.findByPk(productId);
  if (!product || product.stock < quantity) {
    throw new Error('Stock insuficiente');
  }

  cartItem.quantity = quantity;
  cartItem.subtotal = quantity * product.price;
  await cartItem.save();

  await updateCartTotal(cartId);
};

export const removeProductFromCart = async (cartId: number, productId: number) => {
  await CartItem.destroy({ where: { cartId, productId } });
  await updateCartTotal(cartId);
};

export const getCartDetails = async (cartId: number) => {
  return await Cart.findByPk(cartId, {
    include: [{ model: CartItem, as: 'items', include: [Product] }],
  });
};

export const clearCart = async (cartId: number) => {
  await CartItem.destroy({ where: { cartId } });
  const cart = await Cart.findByPk(cartId);
  if (cart) {
    cart.total = 0;
    await cart.save();
  }
};

const updateCartTotal = async (cartId: number) => {
  const cartItems = await CartItem.findAll({ where: { cartId } });
  let total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  const cart = await Cart.findByPk(cartId);
  if (!cart) return;

  // Apply discount if exists
  if (cart.discountCodeId) {
    const discount = await DiscountCode.findByPk(cart.discountCodeId);
    if (discount) {
      if (discount.discountType === 'percentage') {
        total = total - (total * discount.discountValue) / 100;
      } else if (discount.discountType === 'fixed') {
        total = total - discount.discountValue;
      }
    }
  }



  cart.total = total >= 0 ? total : 0;
  await cart.save();
};
