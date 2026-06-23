import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';

const Home = () => {
  const [hello, setHello] = useState("");

  const userName = localStorage.getItem("userFullName");
  
  const fetchHello = async () => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`);
      setHello(response.data);
    }catch(error){
      console.error("Error fetching hello:", error);
    }
  };

  useEffect(() => {
    fetchHello();
  }, []);

  return (
    <div className="d-flex container">
        <div className="col-6 align-self-center p-5">
            <h1>Hello, {userName}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Vestibulum ante ipsum primis in faucibus.</p>
            <button className="btn btn-primary">Shop Now</button>
        </div>
        
        <div className="col-6">
            <img className="img-fluid" src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-f-9.webp"/>
        </div>
    </div>
  )
}

export default Home