// src/screens/ProductosScreen.jsx
import ProductosList from '../components/productos/ProductosList';

function ProductosScreen() {
  return (
    <div className="container">
      <h2 className="mb-4">Gestión de Productos</h2>
      <ProductosList />
    </div>
  );
}

export default ProductosScreen;