// src/services/api.js
import axios from 'axios';

const API_URL = 'http://161.97.95.105:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getProductos = () => api.get('/productos/');
export const getProducto = (id) => api.get(`/productos/${id}/`);
export const createProducto = (data) => api.post('/productos/', data);
export const updateProducto = (id, data) => api.put(`/productos/${id}/`, data);
export const deleteProducto = (id) => api.delete(`/productos/${id}/`);

export const getCategorias = () => api.get('/categorias/');
export const getCategoria = (id) => api.get(`/categorias/${id}/`);
export const createCategoria = (data) => api.post('/categorias/', data);
export const updateCategoria = (id, data) => api.put(`/categorias/${id}/`, data);
export const deleteCategoria = (id) => api.delete(`/categorias/${id}/`);

export default api;