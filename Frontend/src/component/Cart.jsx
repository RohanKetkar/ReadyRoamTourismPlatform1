import React, { useState } from 'react';
import { Container, Image, Row, Col, Button } from "react-bootstrap";
import { NavBar } from "./NavBar";
import { Router } from '../Route/Route';
import { Link } from 'react-router-dom';
export const Cart = () => {
  
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            Package: 'Dubai',
            days: '5',
            price: 249999,
            quantity: 1,
        },               
    ]);

  
    const handleIncrement = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

  
    const handleDecrement = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    
    const handleClearCart = () => {
        setCartItems([]);
    };

    return (
        <div> <NavBar></NavBar>

            <div style={{ padding: '20px' }}>
                <table border="1" style={{ width: '100%', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Remove</th>
                            <hr />
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>
                                   <strong> {item.Package} </strong><br />  Days: {item.days}
                                </td>
                                <td>₹{item.price.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleDecrement(item.id)}>-</button>
                                    <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                                    <button onClick={() => handleIncrement(item.id)}>+</button>
                                </td>
                                <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button
                                        style={{ color: 'red' }}
                                        onClick={() =>
                                            setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id))
                                        }
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>

                    <Row className="d-flex justify-content-between">
                        <Col xs="auto">
                            <Button variant="primary" > <Link to={Router.AFTER} style={{ marginTop:"10px" , textDecoration: "none", color: "white" }}>Explore Packages</Link></Button>
                        </Col>
                        <Col xs="auto" className="text-end">
                            <Button variant="success" onClick={handleClearCart}>Clear Cart</Button>
                        </Col>
                    </Row>
                </div>
            </div></div>
    );
};


