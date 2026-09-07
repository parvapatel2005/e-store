import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../service/axiosInstance';

const ProductDetail = () => {

    const {id} = useParams();
    const [product, setProduct] = useState(null);

    const fetchProductDetail = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/product/${id}`);
            console.log("Product Detail:", response.data.productList);
            setProduct(response.data.productList);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    }

    useEffect(() => {
        fetchProductDetail();
    }, []);

    const handleAddToCart = async () => {
        try {
            const response = await axiosInstance.post('/api/add-to-cart', {
                productId: id,
                quantity: 1,
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <>
            <div className="container py-5">
                
                <h1 className="text-center mb-5 fw-bold">Product Detail Page</h1>

                <div className="row shadow-lg rounded-4 p-4 bg-light align-items-center">
                    <div className="col-md-6 text-center">
                        <img 
                            className="img-fluid rounded-4 shadow"
                            src={product?.image} 
                            alt={product?.productName} 
                            style={{ 
                                width: '400px', 
                                height: '400px',
                                objectFit: 'cover'
                            }} 
                        />
                    </div>

                    <div className="col-md-6 mt-4 mt-md-0">
                        <h2 className="fw-bold mb-4 text-primary">
                            {product?.productName}
                        </h2>

                        <p className="fs-5 text-secondary">
                            {product?.description}
                        </p>

                        <h3 className="mt-4 fw-bold text-success">
                            Price: ${product?.price}
                        </h3>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={handleAddToCart}
                            disabled={!product}
                        >
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProductDetail