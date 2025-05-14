import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import "../css/ProductsDemo.css"; // Importa tu archivo CSS para estilos personalizados
const ProductsDemo = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [variationDialogV, setVariationDialogV] = useState(false);
  const [variationDialog, setVariationDialog] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null);

  // Token SAS para acceso a las imágenes
  const sasToken =
    "?sp=racwdl&st=2025-05-07T20:56:10Z&se=2026-01-02T04:56:10Z&spr=https&sv=2024-11-04&sr=c&sig=CIS3OGPxiOzzevL3U6vp0KK0axoaalRuMVv4IUZmKx8%3D";

  useEffect(() => {
    // Cargar productos
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

  const openProductDialog = (product) => {
    setSelectedProduct(product);
    setProductDialog(true);
  };

  const hideProductDialog = () => {
    setProductDialog(false);
    setSelectedProduct(null);
  };

  const openVariationDialog = (variation) => {
    setSelectedVariation(variation);
    setVariationDialog(true);
  };

  const hideVariationDialogV = () => {
    setVariationDialogV(false);
    setSelectedVariation(null);
  };

  const deleteProduct = async (product) => {
    try {
      if (!product.variations || product.variations.length === 0) {
        // Eliminar el producto si no tiene variaciones
        console.warn("Producto a eliminar sin variaciones: " + product.id);
        const response = await fetch(
          `https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/products/${product.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar el producto");
        }

        setProducts(products.filter((p) => p.id !== product.id));
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Producto eliminado correctamente",
          life: 3000,
        });
      } else {
        // Mostrar pantalla para seleccionar la variación a eliminar
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

  const deleteVariation = async (variationId) => {
    try {
      const response = await fetch(
        `https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/products/variacion/${variationId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la variación");
      }

      // Actualizar el producto eliminando la variación seleccionada
      const updatedProducts = products.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...p,
              variations: p.variations.filter((v) => v.id !== variationId),
            }
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
          onClick={() => openVariationDialog(variation)}
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
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => openProductDialog(rowData)}
        />
        <Button
          icon="pi pi-plus"
          className="p-button-rounded p-button-info mr-2"
          onClick={() => navigate("/agregarVariacion", { state: rowData })}
        />
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger"
          onClick={() => deleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  return (
  <div className="admin-container">
    {/* Menú de navegación vertical */}
    <div className="vertical-menu">
      <h2 className="menu-title">Panel de Proveedor</h2>
      <ul className="menu-list">
        <li onClick={() => navigate("/newProduct")}>Crear Producto</li>
        <li onClick={() => navigate("/manageProducts")}>Gestionar Productos</li>
        <li onClick={() => navigate("/orders")}>Pedidos</li>
        <li onClick={() => navigate("/profile")}>Perfil</li>
        <li onClick={() => navigate("/logout")}>Cerrar Sesión</li>
      </ul>
    </div>

    {/* Contenido principal */}
    <div className="content">
      <Toast ref={toast} />

      <Button
        label="Crear Producto"
        severity="success"
        onClick={() => navigate("/newproducts")}
        className="mb-3"
      />
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

      {/* Diálogo para mostrar detalles del producto */}
      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header="Detalles del Producto"
        modal
        className="p-fluid"
        onHide={hideProductDialog}
      >
        {selectedProduct && (
          <>
            <h3>Producto</h3>
            <p>
              <strong>Nombre:</strong> {selectedProduct.name}
            </p>
            <p>
              <strong>Descripción:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Categoría ID:</strong> {selectedProduct.categoryId}
            </p>
            <p>
              <strong>Creado:</strong>{" "}
              {new Date(selectedProduct.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Actualizado:</strong>{" "}
              {new Date(selectedProduct.updatedAt).toLocaleString()}
            </p>
          </>
        )}
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
            {selectedVariation.variationValues.map((value) => (
              <p key={value.id}>
                <strong>{value.variationValue.option.name}:</strong>{" "}
                {value.variationValue.value}
              </p>
            ))}
          </>
        )}
      </Dialog>

      <Dialog
        visible={variationDialog}
        style={{ width: "450px" }}
        header="Seleccionar Variación para Eliminar"
        modal
        className="p-fluid"
        onHide={() => setVariationDialog(false)}
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

export default ProductsDemo;
