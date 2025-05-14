import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import "../css/ProductsDemo.css";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

const GestionarProductos = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [variationDialogV, setVariationDialogV] = useState(false);
  const [variationDialog, setVariationDialog] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const toast = useRef(null);

  // Token SAS para acceso a las imágenes
  const sasToken =
    "?sp=racwdl&st=2025-05-07T20:56:10Z&se=2026-01-02T04:56:10Z&spr=https&sv=2024-11-04&sr=c&sig=CIS3OGPxiOzzevL3U6vp0KK0axoaalRuMVv4IUZmKx8%3D";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/AllproductsV"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();

        // Agregar el token SAS a las URLs de las imágenes
        const updatedProducts = data.map((product) => ({
          ...product,
          variations: product.variations.map((variation) => ({
            ...variation,
            imageUrl: variation.imageUrl
              ? `${variation.imageUrl}${sasToken}`
              : null,
          })),
        }));

        setProducts(updatedProducts);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
      }
    };

    fetchProducts();
  }, []);

  // Diálogo de detalles de variación
  const hideVariationDialogV = () => {
    setVariationDialogV(false);
    setSelectedVariation(null);
  };

  // Diálogo de eliminar variación
  const hideVariationDialog = () => {
    setVariationDialog(false);
    setSelectedProduct(null);
  };

  // Diálogo de edición de producto y variación
  const hideProductDialog = () => {
    setProductDialog(false);
    setEditProduct(null);
    setSubmitted(false);
  };

  // Abrir diálogo de edición
  const openEditProductDialog = (product) => {
    // Si hay variaciones, toma la primera para editar
    const firstVariation = product.variations?.[0] || {};
    setEditProduct({
      ...product,
      variationName: firstVariation.name || "",
      variationPrice: firstVariation.price || "",
      variationStock: firstVariation.stock || "",
      variationImage: firstVariation.imageUrl || "",
      variationId: firstVariation.id || "",
    });
    setProductDialog(true);
  };

  // Mostrar detalles de variación
  const openVariationDetailsDialog = (variation) => {
    setSelectedVariation(variation);
    setVariationDialogV(true);
  };

  // Eliminar producto
  const deleteProduct = async (product) => {
    try {
      if (!product.variations || product.variations.length === 0) {
        const response = await fetch(
          `https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/products/${product.id}`,
          { method: "DELETE" }
        );
        if (!response.ok) throw new Error("Error al eliminar el producto");
        setProducts(products.filter((p) => p.id !== product.id));
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Producto eliminado correctamente",
          life: 3000,
        });
      } else {
        setSelectedProduct(product);
        setVariationDialog(true);
      }
    } catch (err) {
      console.error("Error al eliminar:", err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo completar la operación",
        life: 3000,
      });
    }
  };

  // Eliminar variación
  const deleteVariation = async (variationId) => {
    try {
      const response = await fetch(
        `https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/products/variacion/${variationId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error al eliminar la variación");
      const updatedProducts = products.map((p) =>
        p.id === selectedProduct.id
          ? { ...p, variations: p.variations.filter((v) => v.id !== variationId) }
          : p
      );
      setProducts(updatedProducts);
      setVariationDialog(false);
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Variación eliminada correctamente",
        life: 3000,
      });
    } catch (err) {
      console.error("Error al eliminar la variación:", err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo completar la operación",
        life: 3000,
      });
    }
  };

  // Handlers para edición
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    setEditProduct((prev) => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditProduct((prev) => ({
      ...prev,
      variationImage: file,
    }));
  };

  const saveProduct = () => {
    setSubmitted(true);
    if (editProduct.name && editProduct.description) {
      // Aquí puedes hacer la petición PUT/PATCH para actualizar el producto y variación
      // Ejemplo: await fetch(..., { method: "PUT", body: ... })
      setProductDialog(false);
      setSubmitted(false);
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Producto actualizado correctamente",
        life: 3000,
      });
    }
  };

  // Templates para la tabla
  const variationBodyTemplate = (rowData) => {
    return rowData.variations.map((variation) => (
      <div key={variation.id} className="mb-2">
        <img
          src={variation.imageUrl}
          alt={variation.name}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "8px",
          }}
        />
        <Button
          label="Ver"
          icon="pi pi-eye"
          className="p-button-text p-button-sm"
          onClick={() => openVariationDetailsDialog(variation)}
        />
      </div>
    ));
  };

  const variationBodyTemplates = (rowData) => {
    return rowData.variations.map((variation) => (
      <div key={variation.id} className="mb-2">
        <Tag
          value={`${variation.name} - $${variation.price}`}
          severity="info"
          className="mr-2"
        />
      </div>
    ));
  };
  const [addVariationDialog, setAddVariationDialog] = useState(false);
const [newVariation, setNewVariation] = useState({
  name: "",
  price: "",
  stock: "",
  image: null,
});

const openAddVariationDialog = (product) => {
  setSelectedProduct(product);
  setNewVariation({ name: "", price: "", stock: "", image: null });
  setAddVariationDialog(true);
};

const handleNewVariationChange = (e) => {
  const { name, value } = e.target;
  setNewVariation((prev) => ({ ...prev, [name]: value }));
};

const handleNewVariationFile = (e) => {
  setNewVariation((prev) => ({ ...prev, image: e.target.files[0] }));
};

const saveNewVariation = async () => {
  // Aquí tu lógica para guardar la variación (POST)
  setAddVariationDialog(false);
  toast.current.show({
    severity: "success",
    summary: "Éxito",
    detail: "Variación añadida correctamente",
    life: 3000,
  });
};

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => openEditProductDialog(rowData)}
        />
       <Button
  icon="pi pi-plus"
  className="p-button-rounded p-button-info mr-2"
  onClick={() => openAddVariationDialog(rowData)}
/>
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger"
          onClick={() => deleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideProductDialog} />
      <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
    </React.Fragment>
  );

  return (
    <div className="admin">
      <div className="contentt">
        <Toast ref={toast} />
        <div className="card">
          <DataTable
            value={products}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            dataKey="id"
            responsiveLayout="scroll"
          >
            <Column field="name" header="Nombre del Producto" sortable></Column>
            <Column
              field="description"
              header="Descripción del Producto"
              sortable
            ></Column>
            <Column
              header="Variaciones"
              body={variationBodyTemplate}
              style={{ minWidth: "20rem" }}
            ></Column>
            <Column
              header="Precio"
              body={variationBodyTemplates}
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              header="Acciones"
              body={actionBodyTemplate}
              style={{ minWidth: "20rem" }}
            ></Column>
          </DataTable>
        </div>
<Dialog
  visible={addVariationDialog}
  style={{ width: "32rem" }}
  header="Añadir variación"
  modal
  className="p-fluid"
  onHide={() => setAddVariationDialog(false)}
  footer={
    <>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setAddVariationDialog(false)} />
      <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveNewVariation} />
    </>
  }
>
  <InputText
    name="name"
    value={newVariation.name}
    onChange={handleNewVariationChange}
    placeholder="Nombre de variación"
    className="p-inputtext-sm mb-2"
  />
  <InputText
    name="price"
    value={newVariation.price}
    onChange={handleNewVariationChange}
    placeholder="Precio"
    className="p-inputtext-sm mb-2"
  />
  <InputText
    name="stock"
    value={newVariation.stock}
    onChange={handleNewVariationChange}
    placeholder="Stock"
    className="p-inputtext-sm mb-2"
  />
  <input
    type="file"
    name="image"
    accept="image/*"
    onChange={handleNewVariationFile}
    className="mb-3"
  />
</Dialog>
        {/* Diálogo para mostrar detalles de la variación */}
        <Dialog
          visible={variationDialogV}
          style={{ width: "450px" }}
          header="Detalles de la Variación"
          modal
          className="p-fluid"
          onHide={hideVariationDialogV}
        >
          {selectedVariation && (
            <>
              <h3>Variación</h3>
              <p>
                <strong>Nombre:</strong> {selectedVariation.name}
              </p>
              <p>
                <strong>Precio:</strong> ${selectedVariation.price}
              </p>
              <p>
                <strong>Stock:</strong> {selectedVariation.stock}
              </p>
              <p>
                <strong>Imagen:</strong>
              </p>
              <img
                src={selectedVariation.imageUrl}
                alt={selectedVariation.name}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              />
              <h4>Valores de Variación</h4>
              {selectedVariation.variationValues?.map((value) => (
                <p key={value.id}>
                  <strong>{value.variationValue.option.name}:</strong>{" "}
                  {value.variationValue.value}
                </p>
              ))}
            </>
          )}
        </Dialog>

        {/* Diálogo para editar producto y variación */}
        <Dialog
          visible={productDialog}
          style={{ width: '32rem' }}
          breakpoints={{ '960px': '75vw', '641px': '90vw' }}
          header="Editar producto y variación"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideProductDialog}
        >
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h3>Datos del producto</h3>
            <InputText
              name="name"
              value={editProduct?.name || ""}
              onChange={(e) => onInputChange(e, 'name')}
              placeholder="Nombre"
              className="p-inputtext-sm mb-2"
              required
            />
            <InputTextarea
              name="description"
              value={editProduct?.description || ""}
              onChange={(e) => onInputChange(e, 'description')}
              placeholder="Descripción"
              className="p-inputtext-sm mb-2"
              required
            />
            <InputText
              name="categoryId"
              value={editProduct?.categoryId || ""}
              onChange={(e) => onInputChange(e, 'categoryId')}
              placeholder="ID Categoría"
              className="p-inputtext-sm mb-2"
              required
            />
            <InputText
              name="supplierId"
              value={editProduct?.supplierId || ""}
              onChange={(e) => onInputChange(e, 'supplierId')}
              placeholder="ID Proveedor"
              className="p-inputtext-sm mb-4"
              required
            />

            <h3>Datos de la variación</h3>
            <InputText
              name="variationName"
              value={editProduct?.variationName || ""}
              onChange={(e) => onInputChange(e, 'variationName')}
              placeholder="Nombre de variación"
              className="p-inputtext-sm mb-2"
            />
            <InputText
              name="variationPrice"
              value={editProduct?.variationPrice || ""}
              onChange={(e) => onInputChange(e, 'variationPrice')}
              placeholder="Precio"
              className="p-inputtext-sm mb-2"
            />
            <InputText
              name="variationStock"
              value={editProduct?.variationStock || ""}
              onChange={(e) => onInputChange(e, 'variationStock')}
              placeholder="Stock"
              className="p-inputtext-sm mb-2"
            />
            <input
              type="file"
              name="variationImage"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-3"
            />
          </div>
        </Dialog>

        {/* Diálogo para eliminar variación */}
        <Dialog
          visible={variationDialog}
          style={{ width: "450px" }}
          header="Seleccionar Variación para Eliminar"
          modal
          className="p-fluid"
          onHide={hideVariationDialog}
        >
          {selectedProduct?.variations.map((variation) => (
            <div key={variation.id} className="mb-3">
              <p>
                <strong>Nombre:</strong> {variation.name}
              </p>
              <p>
                <strong>Precio:</strong> ${variation.price}
              </p>
              <Button
                label="Eliminar"
                icon="pi pi-times"
                className="p-button-danger"
                onClick={() => deleteVariation(variation.id)}
              />
              <hr />
            </div>
          ))}
        </Dialog>
      </div>
    </div>
  );
};

export default GestionarProductos;