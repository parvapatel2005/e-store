import React from 'react'
import { useNavigate } from 'react-router-dom';

const Card = ({ item ,handleAddToCart}) => {

    const navigate = useNavigate();

    const handleProductDetail = (item) => {
        console.log("View details for product:", item);
        try {
            navigate(`/shop/${item._id}`);
        } catch (error) {
            console.error("Error storing product details:", error);
        }
    }

    return (
        <article className="product-card">
            <div className="product-image-wrap">
                <img src={item.image} className="product-image" alt={item.productName}/>
            </div>
            <div className="card-body">
                <h2 className="product-title">{item.productName}</h2>
                <p className="product-description">{item.description}</p>
                <div className="product-footer">
                    <p className="product-price">₹{item.price}</p>
                    <button className="btn btn-primary product-add" onClick={() => handleAddToCart(item._id)}>Add to cart</button>
                </div>
                <button className="product-view" onClick={() => handleProductDetail(item)}>View details <span aria-hidden="true">→</span></button>
            </div>
        </article>
    )
}

export default Card