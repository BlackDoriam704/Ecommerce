import { Router } from 'express';
import { register, login } from '../api/controllers/user.controller';
import { validateUser } from '../api/validators/uservalidator';
import { validateProduct } from '../api/validators/productValidator';
import { addProduct, getProducts, getProduct, updateProductById, deleteProductById } from '../api/controllers/Product.controller';
const router = Router();

// Agregar validaciones al registro
router.post('/users/register', validateUser, register);

// Login no requiere validación adicional
router.post('/users/login', login);


router.post('/products', validateProduct, addProduct); // Crear producto
router.get('/products', getProducts); // Obtener todos los productos
router.get('/products/:id', getProduct); // Obtener un producto por ID
router.put('/products/:id', validateProduct, updateProductById); // Actualizar un producto
router.delete('/products/:id', deleteProductById); // Eliminar un producto

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