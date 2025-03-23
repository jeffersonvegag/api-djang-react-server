// src/components/categorias/CategoriaForm.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getCategoria, createCategoria, updateCategoria } from '../../services/api';

const CategoriaSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
});

function CategoriaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(id);

  useEffect(() => {
    const fetchCategoria = async () => {
      if (!isEditing) return;
      
      try {
        setLoading(true);
        const response = await getCategoria(id);
        setCategoria(response.data);
      } catch (error) {
        console.error('Error fetching categoria:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoria();
  }, [id, isEditing]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEditing) {
        await updateCategoria(id, values);
      } else {
        await createCategoria(values);
      }
      navigate('/categorias');
    } catch (error) {
      console.error('Error saving categoria:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center">Cargando...</div>;

  const initialValues = isEditing && categoria
    ? { ...categoria }
    : { nombre: '' };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">{isEditing ? 'Editar Categoría' : 'Nueva Categoría'}</h5>
      </div>
      <div className="card-body">
        <Formik
          initialValues={initialValues}
          validationSchema={CategoriaSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <Field 
                  name="nombre" 
                  type="text" 
                  className="form-control" 
                  id="nombre" 
                />
                <ErrorMessage name="nombre" component="div" className="text-danger" />
              </div>

              <div className="d-flex gap-2">
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => navigate('/categorias')}
                >
                  Cancelar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CategoriaForm;