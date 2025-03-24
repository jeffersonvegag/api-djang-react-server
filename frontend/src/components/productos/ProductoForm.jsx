import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getProducto, createProducto, updateProducto, getCategorias } from '../../services/api';

const ProductoSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  precio: Yup.number()
    .required('El precio es obligatorio')
    .positive('El precio debe ser positivo'),
  categoria: Yup.number().required('La categoría es obligatoria'),
});

function ProductoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const isEditing = Boolean(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriasResponse = await getCategorias();
        setCategorias(categoriasResponse.data);

        if (isEditing) {
          const productoResponse = await getProducto(id);
          setProducto(productoResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditing]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const dataToSend = {
        ...values,
        precio: values.precio.toString()
      };

      console.log('Data to send:', dataToSend); // Depuración

      if (isEditing) {
        await updateProducto(id, dataToSend);
        console.log('Producto actualizado'); // Depuración
      } else {
        await createProducto(dataToSend);
        console.log('Producto creado'); // Depuración
      }
      navigate('/productos'); // Navegar a la lista de productos para recargar los datos
    } catch (error) {
      console.error('Error saving producto:', error, error.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center">Cargando...</div>;

  const initialValues = isEditing && producto
    ? { ...producto }
    : { nombre: '', precio: '', categoria: '' };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h5>
      </div>
      <div className="card-body">
        <Formik
          initialValues={initialValues}
          validationSchema={ProductoSchema}
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

              <div className="mb-3">
                <label htmlFor="precio" className="form-label">Precio</label>
                <Field
                  name="precio"
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="precio"
                />
                <ErrorMessage name="precio" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="categoria" className="form-label">Categoría</label>
                <Field
                  as="select"
                  name="categoria"
                  className="form-select"
                  id="categoria"
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="categoria" component="div" className="text-danger" />
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
                  onClick={() => navigate('/productos')}
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

export default ProductoForm;
