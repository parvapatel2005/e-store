import React from 'react'
import Card from '../Component/Card'
import { useEffect ,useState} from 'react'
import axios from 'axios'
import axiosInstance from '../service/axiosInstance'

const Shop = () => {

    const [products, setProducts] = useState([]);

    const fetchProducts = async() => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/list-product`);
            setProducts(response.data.products);
            console.log("Product:", response.data.products);
        }catch(error){
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    
    const handleAddToCart = async (productId) => {
        console.log(productId);
        try{
            const response = await axiosInstance.post('/api/add-to-cart',{productId,quantity: 1});
            console.log(response.data)
            alert(response.data.message)
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
        <div className="d-flex container flex-wrap justify-content-between ">
            {
                products.map((item) => {
                    return (
                        <Card key={item._id} item={item} handleAddToCart={handleAddToCart}/>
                    )
                })
            }
        </div>
        </>
    )
}

export default Shop