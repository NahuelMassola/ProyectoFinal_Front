import { Formik, Form, Field, ErrorMessage } from "formik";
import React from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import '../users/login';
import Swal from "sweetalert2";

const addProduct = ({ show, handleClose }) => {
    return (
    <>
    <Formik
        initialValues={{
            title:'',
            description:'',
            code:'',
            price:'',
            stock:'',
            category:'',
            thumbnail:''
        }}

        validate={(valores)=>{
            let errores = {}

            if(!valores.title){
                errores.title= 'Ingresar un Nombre'
            }else if(!/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(valores.title)) {
                errores.title= 'El Nombre solo puede contener letras en mayúsculas y minúsculas; con tilde,espacios, apostrofes.'
            }
            
            if(!valores.description){
                errores.description= 'Ingresar la Descripcion del Producto'
            }else if(!/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(valores.description)) {
                errores.description= 'La descripcion solo puede contener letras en mayúsculas y minúsculas; con tilde,espacios, apostrofes.'
            }

            if(!valores.price){
                errores.price= 'Ingrese un Precio'
            }else if(!/^\d{5}$/.test(valores.age)) {
                errores.price= 'El precio solo puede contener nuemros con maximo 5.'
            }

            if(!valores.stock){
                errores.stock= 'Ingrese el Stock'
            }else if(!/^\d{2}$/.test(valores.stock)) {
                errores.stock= 'El Stock solo puede contener nuemros con maximo 2.'
            }


            if(!valores.category){
                errores.category= 'Ingresar la Categoria del Producto'
            }else if(!/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(valores.category)) {
                errores.category= 'La Categoria solo puede contener letras en mayúsculas y minúsculas; con tilde,espacios, apostrofes.'
            }

            return errores
        }}

        onSubmit=  {async (valores,{resetForm})=>{

        await fetch("http://localhost:8080/api/products/", {
            method: "POST",
            body: JSON.stringify(valores),
            headers: { "Content-type": "application/json",},
        })
            .then((res) => res.json())
            .then((data) => {
            
            if(data.status == "error"){
                Swal.fire({
                    title: `${data.message}`,
                    icon:`${data.status}`,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Continuar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleClose()
                        resetForm()
                    }
                });
                } else{
                    Swal.fire({
                        title: `${data.message}`,
                        icon:`${data.status}`,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Continuar",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            handleClose()
                            resetForm()
                        }
                    })
                }
            })
            .catch((err) => {
            Swal.fire({
                title: "Usuario Registrado",
                icon: "success",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    resetForm()
                    handleClose()
                }
            });
            });
            }}>
            {({errors})=>(
            <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Registro</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form className="formulario" >
                <div>
                    <label>Nombre</label>
                    <Field
                        type="text"
                        name="title"
                        placeholder="Nombre"
                        id="title"
                    />
                    <ErrorMessage name="title" component={()=>(
                        <div className="error">{errors.title}</div>
                    )}/>
                </div>
                <div>
                    <label>Descripcion</label>
                    <Field
                        type="text"
                        name="Descripcion"
                        placeholder="Descripcion"
                        id="Descripcion"
                    />
                    <ErrorMessage name="Descripcion" component={()=>(
                        <div className="error">{errors.description}</div>
                    )}/>
                </div>
                <div>
                    <label>Precio</label>
                    <Field
                        type="text"
                        name="Precio"
                        placeholder="Precio"
                        id="Precio"
                    />
                    <ErrorMessage name="Precio" component={()=>(
                        <div className="error">{errors.price}</div>
                    )}/>
                </div>
                <div>
                    <label>Stock</label>
                    <Field
                        type="number"
                        name="Stock"
                        placeholder="Stock"
                        id="Stock"
                    />
                    <ErrorMessage name="Stock" component={()=>(
                        <div className="error">{errors.stock}</div>
                    )}/>
                </div>
                <div>
                    <label >Categoria</label>
                    <Field
                        type="text"
                        name="category"
                        placeholder="categoria"
                        id="category"
                    />
                    <ErrorMessage name="category" component={()=>(
                        <div className="error">{errors.category}</div>
                    )}/>
                    </div>
                        <button type="submit" >Enviar</button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
            </Modal>
        )}
    </ Formik>
    </>
    )
}
export default addProduct;