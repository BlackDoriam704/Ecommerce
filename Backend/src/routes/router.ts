import { Router } from "express";
import {
  register,
  login,
  getUserProfile,
} from "../api/controllers/user.controller";
import { validateUser } from "../api/validators/uservalidator";
import { validateProduct } from "../api/validators/productValidator";
import {
  addProduct,
  getProducts,
  getProduct,
  updateProductById,
  deleteProductById,
} from "../api/controllers/Product.controller";
import {
  addProductVariation,
  getProductWithDetails,
  getAlltVariations,
  getAllProducts,
  updateProductVariationById,
  deleteProductVariationById,
} from "../api/controllers/product_variation.controller";
import {
  createNewCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart,
  clearCartItems,
} from "../api/controllers/cart.controller";
import {
  addVariationValue,
  getVariationValues,
  deleteVariationValueById,
  getVariationValuesOption,
} from "../api/controllers/VariationValue.controller";
import {
  addVariationOption,
  getVariationOptions,
  deleteVariationOptionById,
} from "../api/controllers/variation_option.controller";
import {
  addProductVariationValue,
  getProductVariationValues,
  deleteProductVariationValueById,
} from "../api/controllers/ProductVariationValue.controller";

import {
addSupplier,
getSuppliers,
getSupplier,
updateSupplierById,
deleteSupplierById,
} from "../api/controllers/suppliers.controller"

import { authenticate } from "../api/middlewares/auth";
import multer from "multer";

const router = Router();
router.get("/vs/:id", getProductWithDetails); // Obtener un producto con sus variaciones
router.post("/users/register", validateUser, register);

// Login no requiere validación adicional
router.post("/users/login", login);
router.get("/me", authenticate, getUserProfile);

router.post("/products", addProduct); // Crear producto
router.get("/products", getProducts); // Obtener todos los productos
router.get("/products/:id", getProduct); // Obtener un producto por ID
router.put("/products/:id", validateProduct, updateProductById); // Actualizar un producto
router.delete("/products/:id", deleteProductById); // Eliminar un producto

router.get("/AllproductsV", getAllProducts);

const upload = multer({ dest: "uploads/" });
router.post("/products/variacion", upload.single("image"), addProductVariation);
// router.post('/products/variacion', addProductVariation); // Crear una nueva variación de producto
router.get("/variations", getAlltVariations); // Obtener todas las variaciones de producto
// router.get('/products/variacion/:id', getProductVariation); // Obtener una variación de producto por ID
router.put("/products/variacion/:id", updateProductVariationById); // Actualizar una variación de producto por ID
router.delete("/products/variacion/:id", deleteProductVariationById); // Eliminar una variación de producto por ID

router.post("/cart", createNewCart);
router.post("/cart/add", addToCart);
router.put("/cart/update", updateCartItem);
router.delete("/cart/remove", removeFromCart);
router.get("/cart/:cartId", getCart);
router.delete("/cart/:cartId/clear", clearCartItems);

router.post("/variation", addVariationValue);
router.get("/variation", getVariationValues);
router.get("/variation/:id", getVariationValuesOption);
router.delete("/variation/:id", deleteVariationValueById);

router.post("/variationOption", addVariationOption);
router.get("/variationOption", getVariationOptions);
router.delete("/variationOption/:id", deleteVariationOptionById);

router.post("/productVariationValue", addProductVariationValue);
router.get("/productVariationValue", getProductVariationValues);
router.delete("/productVariationValue/:id", deleteProductVariationValueById);

router.post("/suppliers", addSupplier);
router.get("/suppliers", getSuppliers);
router.get("/suppliers/:id", getSupplier);
router.put("/suppliers/:id", updateSupplierById);
router.delete("/suppliers/:id", deleteSupplierById);




export default router;

//ejemplo del patron Rbac
/*
// Ruta protegida: Solo admin puede gestionar usuarios


// Ruta protegida: Solo seller puede gestionar sus productos
router.post('/seller/products', authenticate, authorize('manage_own_products'), (req, res) => {
  res.json({ message: 'Acceso permitido: Gestión de productos propios' });
});

// Ruta protegida: Solo delivery puede marcar pedidos como entregados
router.post('/delivery/orders/:id/deliver', authenticate, authorize('mark_orders_delivered'), (req, res) => {
  res.json({ message: 'Acceso permitido: Pedido marcado como entregado' });
});
*/
