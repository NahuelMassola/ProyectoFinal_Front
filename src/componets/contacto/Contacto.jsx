import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Contacto.css"



const Contacto = () => {
    return ( 
        <>
        <Container className="contacto vh-100 mt-5">
            <Row>
                <Col md={3} sm={3}></Col>
                <Col md={6} sm={6}>
                <Col className="text-center mt-3 mb-3"><h3>LEAVE US YOUR MESSAGE</h3></Col>
                    <form action="" className="" >
                        <input className="form-control form text-center mt-5" required type="text"  placeholder="Name" />
                        <input className="form-control form text-center mt-3" required type="text"  placeholder="Email" />
                        <input className="form-control form text-center mt-3" required dftype="number"  placeholder="Phone" />
                        <input className="form-control form text-center mt-3" required dftype="text"  placeholder="Message" />
                        <Col className="btn-send">
                            <button className="btn btn-primary mt-3">
                            Send Message</button>
                        </Col>
                    </form>
                </Col>
                <Col md={3} sm={3}></Col>
            </Row>
        </Container>
        </>
    )
}


export default Contacto;