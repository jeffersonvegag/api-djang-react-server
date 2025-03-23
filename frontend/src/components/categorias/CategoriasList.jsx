// src/components/categorias/CategoriasList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategorias, deleteCategoria } from '../../services/api';

function CategoriasList() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const response = await getCategorias();
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categorias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría? Esto eliminará todos los productos asociados.')) {
      try {
        await deleteCategoria(id);
        fetchCategorias();
      } catch (error) {
        console.error('Error deleting categoria:', error);
        alert('No se puede eliminar esta categoría porque tiene productos asociados.');
      }
    }
  };

  if (loading) return <div className="text-center">Cargando categorías...</div>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Lista de Categorías</h5>
        <Link to="/categorias/nueva" className="btn btn-primary">Nueva Categoría</Link>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length > 0 ? (
              categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.id}</td>
                  <td>{categoria.nombre}</td>
                  <td>
                    <Link to={`/categorias/editar/${categoria.id}`} className="btn btn-sm btn-warning me-2">
                      Editar
                    </Link>
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => handleDelete(categoria.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No hay categorías disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoriasList;