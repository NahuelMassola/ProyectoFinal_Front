import React from 'react'
import ReactDOM from 'react-dom/client'
import NavBar from './componets/header/Navbar'
import ItemListContainer from './componets/main/ItemListContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Cart from './componets/cart/cart'
import Stripe from './componets/stripe/Stripe'
import Principal from './componets/main/Principal'
import Footer from './componets/Footer/footer'
import Contacto from './componets/contacto/Contacto'
import AddProduct from './componets/main/addProduct'



ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <NavBar />
         <Routes>
            <Route path="/" element={<Principal />}/>
            <Route path="/products" element={<ItemListContainer />}/>
            <Route path="/addproduct" element={<AddProduct />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/stripe/:cid" element={<Stripe />} />
            <Route path="/contacto" element={<Contacto />}/>
         </Routes>
      <Footer/>
   </BrowserRouter>
)