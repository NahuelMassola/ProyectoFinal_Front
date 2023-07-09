import React , { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {Row, Col, Container} from "react-bootstrap"
import {IoAddCircleOutline, IoRemoveCircleOutline, IoBagAdd,} from "react-icons/io5"

// Componente Contador //
const ItemCount = (props) => {
    const [count, setCount] = useState(props.initial);
    const [stock , setStock] = useState (props.stock)

    // funcion sumar contador // 
    const sumar =  () => {
        if  (count < stock) {
            setCount(count + 1) ;
        } else {
            Swal.fire(
                'Can´t exceed the available stock!',
                'Click Ok to go Back!',
                'error'
            )
        }
    }

    // funcion restar contador //
    const restar = () => {
        if (count > 1 ) {
            setCount(count -1 );
        } else {
            Swal.fire(
                'Can´t add less than 1 product!',
                'Click OK to go Back!',
                'error'
            )
        }
    }

    // funcion Agregar Productos //
    const agregarProductos = () => {
        if (stock === 0) {
            Swal.fire(
                'No Stock!',
                'Click OK to go Back!',
                'error'
            )
        }
        else if  (count <= stock ) {
            props.onAdd(count);
            setStock (stock - count);
            Swal.fire(
                'You added a product!',
                'Click OK to Continue',
                'success'
            )
        }
    } ;

    useEffect(() => { 
        setStock(stock);
    }, [stock]);

    return (
            <Container>
                <Row className='card-detail-button d-flex justify-content-center pt-5'>
                    <Col xs={12} className="d-flex justify-content-center">
                        <button className='box-button' onClick={agregarProductos}><IoBagAdd size={20}/> ADD TO CART</button>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-center mt-2">                       <button className='box-button' onClick={restar}><IoRemoveCircleOutline size={20}/></button>
                        <button className='box-button mb-5'>{count}</button>
                        <button className='box-button' onClick={sumar}><IoAddCircleOutline size={20}/></button>
                    </Col>
                </Row>
            </Container>
    )
}

export default ItemCount;