import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const Logo =()=>{ 
  return (
    <Link to='/'>
    <img src={logo} className="logo img-fluid" width="70" height="48" alt="logo iloveVita"/>
    </Link>
)} 

export default Logo;