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
        <div className="card" style={{ width: '18rem' }}>
            <img src={item.image} className="card-img-top" alt={item.productName}/>
            <div className="card-body">
                <h5 className="card-title">Title: {item.productName}</h5>
                <p className="card-text">Description: {item.description}</p>
                <p>Price: {item.price}</p>
                <button className="btn btn-primary m-2" onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
                <button className="btn btn-warning m-2" onClick={() => handleProductDetail(item)}>View</button>
            </div>
        </div>
    )
}

export default Card