import React from 'react';
import { Link } from "react-router-dom"
import logo from '../img/new arrival (2).jpg';
import logo1 from '../img/logo1.jpg';
import logo2 from '../img/logo2.jpg';
import logo3 from '../img/logo3.jpg';
import logo4 from '../img/logo4.jpg';

const Principal = () => {



    return (
        <>
        <div className="container-fluid ">
            <h1 className="text-center m-5">{`Bienvenido a Tu Tienda Online!!!"`}</h1>
        </div>
        <div className="container-fluid">
        <Link to='/products'>
            <img src={logo} className="logo img-fluid" alt="logo iloveVita"/>
        </Link>
        <div className="container">
            <div className="row">
                <div className="col col-lg-6 d-flex  justify-content-start">
                    <Link to='/products'>
                        <img src={logo1} className="logo img-fluid mt-3" alt="logo newin"/>
                    </Link>
            </div>
                <div className="col col-lg-6 d-flex justify-content-end">
                    <Link to='/products'>
                        <img src={logo2} className="logo img-fluid mt-3" alt="logo noche"/>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col col-lg-6 d-flex  justify-content-start">
                    <Link to='/products'>
                        <img src={logo3} className="logo img-fluid mt-3" alt="logo abrigos"/>
                    </Link>
            </div>
                <div className="col col-lg-6 d-flex justify-content-end">
                    <Link to='/products'>
                        <img src={logo4} className="logo img-fluid mt-3" alt="logo dia"/>
                    </Link>
                </div>
            </div>
        </div>
        </div> 
        </>
    )
}

export default Principal