// src/components/productos/ProductosList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductos, deleteProducto } from '../../services/api';

function ProductosList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await getProductos();
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching productos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProducto(id);
        fetchProductos();
      } catch (error) {
        console.error('Error deleting producto:', error);
      }
    }
  };

  if (loading) return <div className="text-center">Cargando productos...</div>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Lista de Productos</h5>
        <Link to="/productos/nuevo" className="btn btn-primary">Nuevo Producto</Link>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 ? (
                productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>{producto.categoria}</td>
                    <td>
                      <Link to={`/productos/editar/${producto.id}`} className="btn btn-sm btn-warning me-2">
                        Editar
                      </Link>
                      <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => handleDelete(producto.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No hay productos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductosList;