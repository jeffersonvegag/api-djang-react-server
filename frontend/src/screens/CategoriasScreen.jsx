// src/screens/CategoriasScreen.jsx
import CategoriasList from '../components/categorias/CategoriasList';

function CategoriasScreen() {
  return (
    <div className="container">
      <h2 className="mb-4">Gestión de Categorías</h2>
      <CategoriasList />
    </div>
  );
}

export default CategoriasScreen;