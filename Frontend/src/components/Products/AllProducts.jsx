import React, { useEffect, useState } from 'react';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Token SAS para acceso a las imágenes
  const sasToken =
    '?sp=racwdl&st=2025-05-07T20:56:10Z&se=2026-01-02T04:56:10Z&spr=https&sv=2024-11-04&sr=c&sig=CIS3OGPxiOzzevL3U6vp0KK0axoaalRuMVv4IUZmKx8%3D';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/AllproductsV');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();

        // Agregar el token SAS a las URLs de las imágenes
        const updatedProducts = data.map((product) => ({
          ...product,
          variations: product.variations.map((variation) => ({
            ...variation,
            imageUrl: variation.imageUrl ? `${variation.imageUrl}${sasToken}` : null,
          })),
        }));

        setProducts(updatedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Todos los Productos</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              width: '300px',
              textAlign: 'center',
            }}
          >
            <h3>{product.name}</h3>
            <p>{product.description}</p>

            {/* Mostrar las variaciones del producto */}
            {product.variations.length > 0 ? (
              <div>
                <h4>Variaciones:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {product.variations.map((variation) => (
                    <div key={variation.id} style={{ textAlign: 'center' }}>
                      {/* Mostrar la imagen de la variación */}
                      <img
                        src={variation.imageUrl || 'https://via.placeholder.com/300'}
                        alt={variation.name}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                      <p>
                        {variation.name} - ${variation.price} - Stock: {variation.stock}
                      </p>

                      {/* Mostrar el color si está disponible */}
                      {variation.variationValues.length > 0 &&
                        variation.variationValues.map((value) => (
                          <p key={value.id}>
                            {value.variationValue.option.name}: {value.variationValue.value}
                          </p>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>Sin variaciones</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;