import React, {useState, useEffect} from 'react';
import ItemsList from './itemList';
import axios from 'axios';

const ItemListContainer = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
      const renderProducts = async()=>{
        try {  
          const res = await axios({
          url:`http://localhost:8080/api/products`,
          method: 'GET',
          withCredentials: true,
      })         
        const data = res.data.payload
          setData(data.docs) 
        } catch (error) {
        console.log(error)  
      }}
      renderProducts() 
  }, []);


  const  infouser = JSON.parse(localStorage.getItem('user'))
    if(!infouser) {
    return(
      <>
      <div className='d-flex justify-content-center align-items-center vh-100'><h1>INICIA SESION PARA VER LOS PRODUCTOS</h1></div>
      </>
    ) 
    }
    return (
      <>
      <div className="container-fluid ">
        <h1 className="text-center m-5">{`PRODUCTOS`}</h1>
      </div>
      <div className="container-fluid">
      </div>
      {<ItemsList datos={data} />}
      </>
    )
}
export default ItemListContainer;
