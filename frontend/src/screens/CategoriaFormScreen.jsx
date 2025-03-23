// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductosScreen from './screens/ProductosScreen';
import CategoriasScreen from './screens/CategoriasScreen';
import ProductoFormScreen from './screens/ProductoFormScreen';
import CategoriaFormScreen from './screens/CategoriaFormScreen';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate replace to="/productos" />} />
          <Route path="/productos" element={<ProductosScreen />} />
          <Route path="/productos/nuevo" element={<ProductoFormScreen />} />
          <Route path="/productos/editar/:id" element={<ProductoFormScreen />} />
          <Route path="/categorias" element={<CategoriasScreen />} />
          <Route path="/categorias/nueva" element={<CategoriaFormScreen />} />
          <Route path="/categorias/editar/:id" element={<CategoriaFormScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;