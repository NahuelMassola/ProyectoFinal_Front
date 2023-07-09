import React, { useEffect, useState } from 'react';
import '../style/card.css';
import '../style/boton.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';



export const Items =({info})=>{
   const {_id ,price, description , thumbnail, title} = info
   const [userLogin, setUserLogin]= useState(false)
   const [user, setUser]= useState([])

   useEffect(()=>{
      const user = localStorage.getItem('user')
         if (!user){
         setUserLogin(false)
      }else{
         setUserLogin(true)
         setUser(user)
      }
   },[])
   const addProduct = (async(id)=>{
      if (!userLogin){
         Swal.fire({
            icon: 'error',
            title: 'Para Agregar Producto',
            text: 'Iniciar Sesión',
         })
         } else{
            const {cart} = JSON.parse(user)
            const res = await axios({
               url:`http://localhost:8080/api/carts/${cart}/product/${id}`,
               method: 'POST',
               withCredentials: true,
               })         
            const data = res.data
            }
            Swal.fire({
               icon: 'success',
               title: 'Producto Agregado',
               
            })
         })
   return (
      <div className="col-md-3  d-flex justify-content-center">
         <Card style={{ width: '20rem' }} className="mt-3">
         <Card.Body className='text-center'>
         <img src={thumbnail} className='img-fluid' width="200"  alt={title}/>
         <Card.Title className='text-center mt-2'>{title}</Card.Title>
         <Card.Text className='text-center'>
            <h4 className="card-text">$ {price}</h4>
         </Card.Text>
            <div className='d-flex justify-content-center'>
            <div className='text-center'>
               <Button className='text-center m-2' onClick={()=> addProduct(_id)} variant="dark">Agregar</Button>
            </div>
            <div className='text-center'>
               <Button className='text-center m-2' variant="dark" ><Link to={"/item/" + _id} className='detalle'>Detalle</Link></Button>
            </div>
            </div>
         </Card.Body>
         </Card>
      </div>
   )
}
export default Items;
