import React, { useState } from 'react';
import '../style/header.css';
import Nav from 'react-bootstrap/Nav';
import Logo from './logo';
import Login from '../users/login';
import Register from '../users/register';
import AddProduct from '../main/AddProducts';
import Carrito from './CardWidget';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const NavBar = () => {
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showr, setShowr] = useState(false);
  const [showa, setShowa] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClosea = () => setShowa(false);
  const handleShowa = () => setShowa(true);
  const handleCloser = () => setShowr(false); //cerrar register
  const handleShowr = () => setShowr(true); // mostrar register
  const handlelogout = async () => {
    const res = await axios({
      url: 'https://proyectofinalback-production-b4d4.up.railway.app/api/session/logout',
      method: 'GET',
    });

    const data = res.data;
    Swal.fire({
      title: `${data.message}`,
      icon: `${data.status}`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        handleClose();
        Navigate('/');
      }
    });
  };

  const infouser = JSON.parse(localStorage.getItem('user'));
  if (!infouser) {
    return (
      <>
        <div className="container-fluid navbar2">
          <div className="container ">
            <div className="row ">
              <div className="col col-lg-5 d-flex  justify-content-start">
                <Nav.Link className="text-white m-3" href="/">
                  Inicio
                </Nav.Link>
                <Nav.Link className="text-white m-3" href="/contacto">
                  Contacto
                </Nav.Link>
                <Nav.Link className="text-white m-3" href="/products">
                  Productos
                </Nav.Link>
              </div>
              <div className="col col-lg-2 text-center">
                <Logo />
              </div>
              <div className="col col-lg-5 d-flex justify-content-end">
                <Nav.Link
                  className="text-white m-3"
                  href="#login"
                  onClick={handleShow}
                >
                  Iniciar Session
                </Nav.Link>
                <Nav.Link
                  className="text-white m-3"
                  href="#register"
                  onClick={handleShowr}
                >
                  Registrarse
                </Nav.Link>
                <Carrito />
              </div>
              {show && <Login show={show} handleClose={handleClose} />}
              {showr && <Register show={showr} handleClose={handleCloser} />}
            </div>
          </div>
        </div>
      </>
    );
  }
  if (infouser.rol === 'administrador') {
    return (
      <>
        <div className="container-fluid navbar2">
          <div className="container ">
            <div className="row ">
              <div className="col col-lg-5 d-flex  justify-content-start">
                <Nav.Link className="text-white m-3" href="/">
                  Inicio
                </Nav.Link>
                <Nav.Link className="text-white m-3" href="/contacto">
                  Contacto
                </Nav.Link>
                <Nav.Link className="text-white m-3" href="/products">
                  Productos
                </Nav.Link>
              </div>
              <div className="col col-lg-2 text-center">
                <Logo />
              </div>
              <div className="col col-lg-5 d-flex justify-content-end">
                <Nav.Link
                  className="text-white m-3"
                  href="#addproduct"
                  onClick={handleShowa}
                >
                  Agregar Producto
                </Nav.Link>
                <Nav.Link
                  className="text-white m-3"
                  href="#logout"
                  onClick={handlelogout}
                >
                  cerrar Session{' '}
                </Nav.Link>
                <Carrito />
              </div>
              {showa && <AddProduct show={showa} handleClose={handleClosea} />}
              {showr && <Register show={showr} handleClose={handleCloser} />}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container-fluid navbar2">
        <div className="container ">
          <div className="row ">
            <div className="col col-lg-5 d-flex  justify-content-start">
              <Nav.Link className="text-white m-3" href="/">
                Inicio
              </Nav.Link>
              <Nav.Link className="text-white m-3" href="/contacto">
                Contacto
              </Nav.Link>
              <Nav.Link className="text-white m-3" href="/products">
                Productos
              </Nav.Link>
            </div>
            <div className="col col-lg-2 text-center">
              <Logo />
            </div>
            <div className="col col-lg-5 d-flex justify-content-end">
              <Nav.Link
                className="text-white m-3"
                href="#logout"
                onClick={handlelogout}
              >
                cerrar Session{' '}
              </Nav.Link>
              <Carrito />
            </div>
            {showr && <Register show={showr} handleClose={handleCloser} />}
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBar;
