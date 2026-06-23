import React from 'react'
import axiosInstance from '../service/axiosInstance'
import { useEffect } from 'react';
import { useState } from 'react';

const AddToCart = () => {

    const [cartItem, setCartItem] = useState([]);

    const fetchAddToCart = async ()=>{
        try{
            const response = await axiosInstance.get("/api/get-cart");
            console.log(response.data.cartItem);
            setCartItem(response.data.cartItem);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchAddToCart()
    },[])

    const updateQuantity = async (productId, quantity) => {
        try{
            const response = await axiosInstance.put("/api/update-quantity",{productId,quantity});
            console.log(response.data);
            alert(response.data.message);
            fetchAddToCart();
        }catch(err){
            console.log(err);
        }
    }

    const removeItem = async (itemId) => {
        try{
            const response = await axiosInstance.delete(`/api/remove-item/${itemId}`);
            console.log(response.data);
            alert(response.data.message);
            fetchAddToCart();
        }catch(err){
            console.log(err)
        }
    }

    const removeAll = async () => {
        try{
            const response = await axiosInstance.delete('/api/clear-cart');
            console.log(response.data);
            alert(response.data.message);
            fetchAddToCart();
        }catch(err){
            console.log(err);
        }
    }

    const payment = async (cartItem) => {
        try {
            const totalAmountInRupees = cartItem.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
            );

            // Create Razorpay order
            const { data } = await axiosInstance.post("/api/create-order", {
                amount: totalAmountInRupees,
                currency: "INR",
            });

            const { id: order_id, amount, currency } = data;

            const options = {
                key: "rzp_test_T2hmFOBgSUt3qb",
                amount,
                currency,
                name: "Estore E-Commerce",
                description: "Order Payment",
                order_id,

                handler: async function (response) {
                    try {
                        const verifyResponse = await axiosInstance.post(
                            "/api/verify-order",
                            {
                                razorpay_order_id:
                                    response.razorpay_order_id,
                                razorpay_payment_id:
                                    response.razorpay_payment_id,
                                razorpay_signature:
                                    response.razorpay_signature,
                                cartItems: cartItem,
                            }
                        );

                        if (verifyResponse.data.success) {
                            alert(
                                `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
                            );

                            fetchAddToCart(); // refresh cart
                        }
                    } catch (err) {
                        console.error(err);
                        alert("Payment verification failed");
                    }
                },

                prefill: {
                    name: "",
                    email: "",
                    contact: "",
                },

                theme: {
                    color: "#3399cc",
                },
            };

            const razorpay = new window.Razorpay(options);

            razorpay.on("payment.failed", function (response) {
                console.error(response.error);
                alert("Payment Failed");
            });

            razorpay.open();
        } catch (error) {
            console.error("Payment initiation failed:", error);
            alert("Unable to initiate payment");
        }
    };

    return (
        <div className="container">
            <div className="col-12 d-flex mt-3 gap-3">
                <div className="col-8" style={{ border: "1px solid", padding: "25px", borderRadius: "40px" }}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h1>Add To Cart</h1>
                        {
                            cartItem?.length !== 0 && <button className='btn btn-danger' onClick={()=>removeAll()}>Remove All</button>
                        }
                    </div>
                    {
                        cartItem?.length === 0 ? 
                        <div>No product in cart</div> 
                        :
                        cartItem.map((item)=>{
                            return(
                                <div key={item._id} className='d-flex justify-content-evenly align-items-center mt-4'>
                                    <div>
                                        <img src={item.product.image} height={200} width={200} />
                                    </div>
                                    <div>
                                        <p>Category: {item.product.categories.categoryName}</p>
                                        <p>Product Name: {item.product.productName}</p>
                                        <p>Product Description: {item.product.description}</p>
                                        <p>Product Price: {item.product.price * item.quantity}</p>
                                        <div className='d-flex gap-3 align-items-baseline'>
                                            Quantity:
                                            <button onClick={()=>updateQuantity(item.product._id,item.quantity-1)}>-</button>
                                            <p>{item.quantity}</p>
                                            <button onClick={()=>updateQuantity(item.product._id,item.quantity+1)}>+</button>
                                        </div>
                                        <button onClick={() => {removeItem(item._id)}} style={{background: "none",border:"none"}}><img src="/delete.svg" width={40} height={40}/></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-4" style={{ border: "1px solid", padding: "25px", borderRadius: "40px" }}>
                    <h1>Summary</h1>
                    <p>Total: {cartItem.reduce((acc,item) => acc+item.product.price * item.quantity,0)}</p>
                    <button disabled={cartItem.length === 0} onClick={() => payment(cartItem)}>Pay Now</button>
                </div>
            </div>
        </div>
    )
}

export default AddToCart