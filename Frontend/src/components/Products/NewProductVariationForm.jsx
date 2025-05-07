import React, { useState } from 'react';

const NewProductVariationForm = () => {
  const [formData, setFormData] = useState({
    productId: '',
    name: '',
    price: '',
    stock: '',
    image: null, // Para manejar el archivo de imagen
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formDataToSend = new FormData();
    formDataToSend.append('productId', formData.productId);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('stock', formData.stock);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    // Mostrar en la consola lo que se está enviando
    console.log('Datos enviados a la API:');
    for (let pair of formDataToSend.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await fetch('https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/products/variacion', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Error al crear la variación de producto');
      }

      setSuccess(true);
      setFormData({
        productId: '',
        name: '',
        price: '',
        stock: '',
        image: null,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Crear Nueva Variación de Producto</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>Variación de producto creada exitosamente</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productId">ID del Producto:</label>
          <input
            type="number"
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="name">Nombre de la Variación:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Imagen:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Variación'}
        </button>
      </form>
    </div>
  );
};

export default NewProductVariationForm;