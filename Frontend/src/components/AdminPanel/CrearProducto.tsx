import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Message } from "primereact/message";
import { Dialog } from "primereact/dialog";
import VerticalMenu from "../utility/VerticalMenu";

const CrearProducto = () => {
  const [productFormData, setProductFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    supplierId: "",
  });

  const [variationFormData, setVariationFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image: null,
  });

  const [variationOptions, setVariationOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [variationValues, setVariationValues] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
const [createdVariationId, setCreatedVariationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [showDialog, setShowDialog] = useState(false);

  // Cargar opciones de variación
  useEffect(() => {
    const fetchVariationOptions = async () => {
      try {
        const response = await fetch(
          "https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/variationOption"
        );
        const data = await response.json();
        setVariationOptions(data);
      } catch (err) {
        console.error("Error al cargar las opciones de variación:", err);
      }
    };

    fetchVariationOptions();
  }, []);

  // Cargar valores de variación según la opción seleccionada
  useEffect(() => {
    if (selectedOption) {
      const fetchVariationValues = async () => {
        try {
          const response = await fetch(
            `https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/variation/${selectedOption.id}`
          );
          const data = await response.json();
          console.log("Valores de variación cargados:", data); // Depuración
          setVariationValues(data);
        } catch (err) {
          console.error("Error al cargar los valores de variación:", err);
        }
      };

      fetchVariationValues();
    }
  }, [selectedOption]);
  // Manejar cambios
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductFormData({ ...productFormData, [name]: value });
  };

  const handleVariationChange = (e) => {
    const { name, value } = e.target;
    setVariationFormData({ ...variationFormData, [name]: value });
  };

  const handleFileChange = (e) => {
    setVariationFormData({ ...variationFormData, image: e.target.files[0] });
  };
const handleAddVariationValue = async () => {
  console.log("manejo de inf:", selectedValues, selectedOption.id);

  try {
    const Option = selectedOption.id; 
    console.log("ID del nueva variacion: ", createdVariationId,Option,selectedValues );
    const payload = {
      variationValueId: selectedValues,
      productVariationId: createdVariationId,
    };

    console.log("Enviando datos al backend: 111111111111", payload);

    const response = await fetch(
      "https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/productVariationValue",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Error al guardar el valor de la variación");
    }

    setSelectedValues([]);
    setSelectedOption(null);
    setShowDialog(false);
    setSuccess(true);
    console.log("Valor de variación guardado exitosamente.");
  } catch (err) {
    console.error("Error al añadir valor de variación:", err);
    setError("Error al añadir valor de variación");
  }
};

  // Submit único
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Crear el producto
      const productResponse = await fetch(
        "https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productFormData),
        }
      );

      if (!productResponse.ok) {
        throw new Error("Error al crear el producto");
      }

      const productData = await productResponse.json();
      console.log("Respuesta del producto creado:", productData);

      // Acceder al ID del producto creado
      const newProductId = productData.product.id;
      if (!newProductId) {
        throw new Error("El ID del producto no se devolvió correctamente");
      }

      // Crear la variación
      const formData = new FormData();
      formData.append("productId", newProductId);
      formData.append("name", variationFormData.name);
      formData.append("price", variationFormData.price);
      formData.append("stock", variationFormData.stock);
      if (variationFormData.image) {
        formData.append("image", variationFormData.image);
      }

      console.log(
        "Datos enviados para la variación:",
        Array.from(formData.entries())
      );

     const variationResponse = await fetch(
  "https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/products/variacion",
  {
    method: "POST",
    body: formData,
  }
);

if (!variationResponse.ok) {
  // Elimina el producto si la variación falla
  await fetch(
    `https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/products/${newProductId}`,
    {
      method: "DELETE",
    }
  );
  throw new Error("Error al crear la variación. Producto eliminado.");
}
const variationData = await variationResponse.json();
console.log("🔍 Respuesta completa del backend (variación):", variationData);

const variationId = variationData.productVariation.id;
setCreatedVariationId(variationId);

console.log("✅ ID de la variación creada:", variationId);

      setShowDialog(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Card title="Crear producto y variación">
        {error && <Message severity="error" text={error} />}
        {success && (
          <Message
            severity="success"
            text="Producto y variación creados exitosamente"
          />
        )}
        <form onSubmit={handleSubmit} className="p-fluid">
          <h3>Datos del producto</h3>
          <InputText
            name="name"
            value={productFormData.name}
            onChange={handleProductChange}
            placeholder="Nombre"
            className="p-inputtext-sm mb-2"
          />
          <InputTextarea
            name="description"
            value={productFormData.description}
            onChange={handleProductChange}
            placeholder="Descripción"
            className="p-inputtext-sm mb-2"
          />
          <InputText
            name="categoryId"
            value={productFormData.categoryId}
            onChange={handleProductChange}
            placeholder="ID Categoría"
            className="p-inputtext-sm mb-2"
          />
          <InputText
            name="supplierId"
            value={productFormData.supplierId}
            onChange={handleProductChange}
            placeholder="ID Proveedor"
            className="p-inputtext-sm mb-4"
          />

          <h3>Datos de la variación</h3>
          <InputText
            name="name"
            value={variationFormData.name}
            onChange={handleVariationChange}
            placeholder="Nombre de variación"
            className="p-inputtext-sm mb-2"
          />
          <InputText
            name="price"
            value={variationFormData.price}
            onChange={handleVariationChange}
            placeholder="Precio"
            className="p-inputtext-sm mb-2"
          />
          <InputText
            name="stock"
            value={variationFormData.stock}
            onChange={handleVariationChange}
            placeholder="Stock"
            className="p-inputtext-sm mb-2"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-3"
          />
          <Button
            label="Crear producto y variación"
            type="submit"
            loading={loading}
          />
        </form>
      </Card>

      {/* Diálogo para añadir valores de variación */}
      <Dialog
        header="Añadir valores de variación"
        visible={showDialog}
        style={{ width: "50vw" }}
        onHide={() => setShowDialog(false)}
      >
        <h3>Opciones de variación</h3>
        <Dropdown
          value={selectedOption}
          options={variationOptions}
          onChange={(e) => {
            console.log("Opción seleccionada:", e.value); // Depuración
            setSelectedOption(e.value);
          }}
          optionLabel="name" // Muestra la propiedad "name" como texto
          placeholder="Selecciona una opción"
          className="mb-2"
        />
        {selectedOption && (
   <Dropdown
  value={selectedValues}
  options={variationValues}
  onChange={(e) => {
    console.log("Valores seleccionados:", e.value); // Depuración
    setSelectedValues(e.value);
  }}
  optionValue="id"
  optionLabel="value"
  placeholder="Selecciona una opción"
  className="mb-2"
/>

        )}
        <Button
          label="Añadir valores de variación"
          onClick={handleAddVariationValue}
          className="mb-3"
        />
      </Dialog>
    </div>
  );
};

export default CrearProducto;
