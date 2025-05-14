const { body } = require("express-validator");

export const validateProduct = [
  body("name")
    .isLength({ min: 5, max: 100 })
    .withMessage("El nombre debe tener entre 5 y 100 caracteres.")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage(
      "El nombre solo puede contener caracteres alfanuméricos y espacios."
    ),
  body("description")
    .isLength({ max: 500 })
    .withMessage("La descripción no puede exceder los 500 caracteres."),
  // body('category')
  //   .notEmpty()
  //   .withMessage('La categoría es obligatoria.'),
  // body('price')
  //   .isFloat({ gt: 0 })
  //   .withMessage('El precio debe ser un valor numérico mayor a 0 con dos decimales.'),
  // body('stock')
  //   .isInt({ gt: 0 })
  //   .withMessage('El stock debe ser un número entero positivo.'),
  // body('images')
  //   .isArray({ min: 1, max: 5 })
  //   .withMessage('Debe cargar entre 1 y 5 imágenes.')
  //   .custom((images: string[]) => {
  //     if (!images.every((img: string) => /\.(jpg|png)$/i.test(img))) {
  //       throw new Error('Las imágenes deben estar en formato JPG o PNG.');
  //     }
  //     return true;
  //   }),
];
