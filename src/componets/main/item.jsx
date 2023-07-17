import React, { useEffect, useState } from 'react';
import '../style/card.css';
import '../style/boton.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Navigate } from 'react-router-dom';

export const Items = ({ info }) => {
  const { _id, price, description, thumbnail, title } = info;
  const [userLogin, setUserLogin] = useState(false);
  const [user, setUser] = useState([]);
  const [dataProduct, setDataProduct] = useState([])

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      setUserLogin(false);
    } else {
      setUserLogin(true);
      setUser(user);
    }
  }, []);


  const addProduct = async (id) => {
    if (!userLogin) {
      Swal.fire({
        icon: 'error',
        title: 'Para Agregar Producto',
        text: 'Iniciar Sesión',
      });
    } else {
      const { cart } = JSON.parse(user);
      const res = await axios({
        url: `http://localhost:8080/api/carts/${cart}/product/${id}`,
        method: 'POST',
        withCredentials: true,
      });
      const data = res.data;
    }
    Swal.fire({
      icon: 'success',
      title: 'Producto Agregado',
    }).then((result) => {
      if (result.isConfirmed){
      setDataProduct(data.payload.products)
      Navigate('/products')
      }
    });
  };

  const deleteProduct =async(pid) =>{
                            
    const res = await axios({
      url:`http://localhost:8080/api/products/${pid}`,
      method: 'DELETE',
      withCredentials: true,
      })         
      const data = res.data
      if (data.status == "success") {
        Swal.fire({
          title: `${data.message}`,
          icon: `${data.status}`,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Continuar",
        }).then((result) => {
          if (result.isConfirmed){
          setDataProduct(data.payload.products)
          Navigate('/products')
          }
        });
      }
  }

  const  infouser = JSON.parse(localStorage.getItem('user'))

  if(infouser.rol === "administrador") {
  return (
    <>
      <div className="col-md-3  d-flex justify-content-center">
        <Card style={{ width: '20rem' }} className="mt-3">
          <Card.Body className="text-center">
            <div>
              <img
                src={thumbnail}
                className="img-fluid"
                width="200"
                height="250"
                alt={title}
              />
            </div>
            <Card.Title className="text-center mt-2">{title}</Card.Title>
            <Card.Text className="text-center">{description}</Card.Text>
            <Card.Title className="text-center mt-2">${price}</Card.Title>
            <div className="d-flex justify-content-center">
              <div className="text-center">
                <Button
                  className="text-center m-2"
                  onClick={() => addProduct(_id)}
                  variant="dark"
                >
                  Agregar al carrito
                </Button>
              </div>
            </div>
            <div className='d-flex justify-content-center'>
              <div>
              <Button
                  className="text-center m-2"
                  onClick={() => deleteProduct(_id)}
                  variant="dark"
                >
                  Eliminar Producto
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
  } return (
    <>
      <div className="col-md-3  d-flex justify-content-center">
        <Card style={{ width: '20rem' }} className="mt-3">
          <Card.Body className="text-center">
            <div>
              <img
                src={thumbnail}
                className="img-fluid"
                width="200"
                height="250"
                alt={title}
              />
            </div>
            <Card.Title className="text-center mt-2">{title}</Card.Title>
            <Card.Text className="text-center">{description}</Card.Text>
            <Card.Title className="text-center mt-2">${price}</Card.Title>
            <div className="d-flex justify-content-center">
              <div className="text-center">
                <Button
                  className="text-center m-2"
                  onClick={() => addProduct(_id)}
                  variant="dark"
                >
                  Agregar al carrito
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export default Items;
