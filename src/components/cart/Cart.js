import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar.js";
import { useNavigate } from 'react-router-dom';
import heading from '../../assets/heading.png'
import './ViewCart.css';
import axios from "axios";
import Footer from "../footer/Footer";
import Navigator from "../navigate/Navigate";
import { useMediaQuery } from 'react-responsive';
import NavbarMobile from "../Navbar/NavbarMobile.js";

const Cart = () => {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const user = localStorage.getItem("user");
    const [totalItems, setTotalItems] = useState(0);
    let final_amount = 0;

    const placeOrder = () => {
        const totalAmount = final_amount;
        localStorage.setItem("total", totalAmount);
        navigate('/checkout');
    }

    useEffect(() => {
        axios.get(`https://musicart-80cn.onrender.com/musicProducts/getCart/${user}`)
            .then((response) => {
                setData(response.data);
                setTotalItems(response.data.length);
            })
            .catch((err) => { console.log("error sita ..", err) })
    }, [])

    return (
        <div className="view-cart">
            {isDesktopOrLaptop ? <Navbar /> : <NavbarMobile />}
            {isDesktopOrLaptop ?
                <div className='cart-section'>
                    <div className='heading'>
                        <div className="heading-section">
                            <img src={heading} alt="Music Art" className="heading-img" />
                            <p>Home/View Cart</p>
                        </div>
                        <div>
                            <button>Cart</button>
                        </div>
                    </div>
                    <div className='back-to-home'>
                        <button onClick={() => { navigate('/') }}>Back to Products</button>
                    </div>
                    <center>
                        <div className='cart-symbol'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="49" viewBox="0 0 62 59" fill="none">
                            </svg>
                            <h3>My Cart</h3>
                        </div>
                    </center>
                    <div>
                        <div className="wrapper">
                            <div>
                                {data.map((item, index) => {
                                    final_amount = final_amount + (totalItems * item.price) + 45;
                                    return (
                                        <div className='cart-product-details' key={index}>
                                            <div className="sita">
                                                <img src={item.main_image} alt="" />
                                                <table className="tabu">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <h3>{item.name}</h3><br />
                                                            </td>
                                                            <td>
                                                                <p><b>Price</b></p><br />
                                                            </td>
                                                            <td>
                                                                <label><b>Quantity:</b></label><br />
                                                            </td>
                                                            <td>
                                                                <p><b>Total</b></p><br />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p>Colour : {item.color}</p><br />
                                                                <p>{item.available}</p>
                                                            </td>
                                                            <td>
                                                                <p>₹ {item.price}</p>
                                                            </td>
                                                            <td>
                                                                <select
                                                                    onChange={(e) => setTotalItems(e.target.value)}
                                                                >
                                                                    <option value={1}>1</option>
                                                                    <option value={2}>2</option>
                                                                    <option value={3}>3</option>
                                                                    <option value={4}>4</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <p>{totalItems * item.price}</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            {data.length > 0 && (
                                <div className='table-details'>
                                    <table>
                                        <thead>
                                            <tr><td><b>PRICE DETAILS</b></td></tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Total MRP</td>
                                                <td>:₹{final_amount}</td>
                                            </tr>
                                            <tr>
                                                <td>Discount on MRP</td>
                                                <td> : ₹0</td>
                                            </tr>
                                            <tr>
                                                <td>Convenience Fee</td>
                                                <td> : ₹45</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr><td><b>Total Amount</b></td><td>₹ {final_amount}</td></tr>
                                            <tr><td colSpan="2"><button className='buy-now' onClick={placeOrder}>Place order</button></td></tr>
                                        </tfoot>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                :
                <div>
                    <div className='back' onClick={() => { navigate('/') }} >
                        <br />
                        <i className="ri-arrow-left-line"></i>
                    </div>
                    {data.map((item, index) => {
                        return (
                            <div className='mob-cart-container' key={index}>
                                <div className='mobile-cart-view'>
                                    <div>
                                        <img className='mobile-cart-img' src={item.main_image} alt="" />
                                    </div>
                                    <div className='mob-cart-details'>
                                        <div>
                                            <h3> {item.name}</h3>
                                            <h3> {item.price}</h3>
                                            <p>color : {item.color}</p>
                                            <p> {item.available}</p>
                                            <p>Convienience fee : 45</p>
                                        </div>
                                        <div>
                                            <b> Total :₹ {totalItems * item.price + 45} </b>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className='mob-cart-sub-details'>
                                    <h3>Total amount :₹ {totalItems * item.price + 45}</h3>
                                    <button className='buy-now' onClick={placeOrder}>PLACE ORDER</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
            {isDesktopOrLaptop ? <Footer /> : <Navigator />}
        </div>
    )
}

export default Cart;