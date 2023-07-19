import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../users/login';
import Swal from 'sweetalert2';

const AddProduct = ({ show, handleClose }) => {
  return (
    <>
      <Formik
        initialValues={{
          title: '',
          description: '',
          code: '',
          price: '',
          stock: '',
          category: '',
          thumbnail: '',
        }}
        validate={(valores) => {
          let errores = {};

          if (!valores.title) {
            errores.title = 'Ingresar un Nombre';
          } else if (!/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(valores.title)) {
            errores.title =
              'El Nombre solo puede contener letras en mayúsculas y minúsculas; con tilde,espacios, apostrofes.';
          }

          if (!valores.description) {
            errores.description = 'Ingresar la Descripcion del Producto';
          } else if (!/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(valores.description)) {
            errores.description =
              'La descripcion solo puede contener letras en mayúsculas y minúsculas; con tilde,espacios, apostrofes.';
          }

          if (!valores.code) {
            errores.code = 'Ingresar la Descripcion del Producto';
          } else if (!/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(valores.code)) {
            errores.code =
              'La descripcion solo puede contener letras en mayúsculas y minúsculas; con tilde,espacios, apostrofes.';
          }

          if (!valores.price) {
            errores.price = 'Ingrese un Precio';
          }

          if (!valores.stock) {
            errores.stock = 'Ingrese el Stock';
          } 

          if (!valores.category) {
            errores.category = 'Ingresar la Categoria del Producto';
          } else if (!/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(valores.category)) {
            errores.category =
              'La Categoria solo puede contener letras en mayúsculas y minúsculas; con tilde,espacios, apostrofes.';
          }

          if (!valores.thumbnail) {
            errores.thumbnail = 'Ingrese la URL de la imagen';
          } 

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          console.log('submitting');
          axios
            .post('https://proyectofinalback-production-b4d4.up.railway.app/api/products/', valores, {
              withCredentials: true,
            })
            .then(function (response) {
              const { data } = response;

              if (data.status == 200) {
                Swal.fire({
                  title: `Producto Agregado`,
                  icon: `${data.status}`,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Continuar',
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleClose();
                    resetForm();
                  }
                });
              } else {
                Swal.fire({
                  title: `Producto Agregado`,
                  icon: `${data.status}`,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Continuar',
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleClose();
                    resetForm();
                  }
                });
              }
            })
            .catch(function (err) {
              console.errors('error al agregar producto', err);
              Swal.fire({
                title: 'Error al agregar producto.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  resetForm();
                  handleClose();
                }
              });
            });
        }}>
        {({ errors }) => (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center">AGREGAR UN PRODUCTO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="formulario">
                <div>
                  <label>Nombre</label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Nombre"
                    id="title"
                  />
                  <ErrorMessage
                    name="title"
                    component={() => (
                      <div className="error">{errors.title}</div>
                    )}
                  />
                </div>
                <div>
                  <label>Descripcion</label>
                  <Field
                    type="text"
                    name="description"
                    placeholder="Descripcion"
                    id="description"
                  />
                  <ErrorMessage
                    name="description"
                    component={() => (
                      <div className="error">{errors.description}</div>
                    )}
                  />
                </div>
                <div>
                  <label>Precio</label>
                  <Field
                    type="number"
                    name="price"
                    placeholder="Precio"
                    id="price"
                  />
                  <ErrorMessage
                    name="price"
                    component={() => (
                      <div className="error">{errors.price}</div>
                    )}
                  />
                </div>
                <div>
                  <label>Codigo</label>
                  <Field
                    type="text"
                    name="code"
                    placeholder="Codigo"
                    id="code"
                  />
                  <ErrorMessage
                    name="code"
                    component={() => (
                      <div className="error">{errors.code}</div>
                    )}
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <Field
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    id="stock"
                  />
                  <ErrorMessage
                    name="stock"
                    component={() => (
                      <div className="error">{errors.stock}</div>
                    )}
                  />
                </div>
                <div>
                  <label>Categoria</label>
                  <Field
                    type="text"
                    name="category"
                    placeholder="Categoria"
                    id="category"
                  />
                  <ErrorMessage
                    name="category"
                    component={() => (
                      <div className="error">{errors.category}</div>
                    )}
                  />
                </div>
                <div>
                  <label>Imagen</label>
                  <Field
                    type="text"
                    name="thumbnail"
                    placeholder="URL de la imagen"
                    id="thumbnail"
                  />
                  <ErrorMessage
                    name="thumbnail"
                    component={() => (
                      <div className="error">{errors.thumbnail}</div>
                    )}
                  />
                </div>
                <button type="submit">Enviar</button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    </>
  );
};
export default AddProduct;
