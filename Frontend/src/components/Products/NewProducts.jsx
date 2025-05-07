import React, { useState } from 'react';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    supplierId: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }

      setSuccess(true);
      setFormData({
        name: '',
        description: '',
        categoryId: '',
        supplierId: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Crear Producto</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>Producto creado exitosamente</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre del Producto:</label>
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
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="categoryId">ID de Categoría:</label>
          <input
            type="number"
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="supplierId">ID del Proveedor:</label>
          <input
            type="number"
            id="supplierId"
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;