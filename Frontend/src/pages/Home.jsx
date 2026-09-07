import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [hello, setHello] = useState("");
  const navigate = useNavigate();

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
    <main className="home-page">
      <section className="home-hero container">
        <div className="home-copy">
          <span className="eyebrow">Thoughtful shopping, made simple</span>
          <h1>Hello, {userName || 'there'}<span>.</span></h1>
          <p>Find everyday essentials and standout pieces in one easy-to-browse collection.</p>
          <button className="btn btn-primary home-cta" onClick={() => navigate('/shop')}>
            Explore the collection <span aria-hidden="true">→</span>
          </button>
          <div className="home-highlights" aria-label="NexCart benefits">
            <span><strong>Curated</strong> products</span>
            <span><strong>Simple</strong> checkout</span>
            <span><strong>Fresh</strong> arrivals</span>
          </div>
        </div>

        <div className="home-image-wrap">
          <div className="home-image-label">New season picks</div>
          <img className="home-image" src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-f-9.webp" alt="Featured fashion product" />
        </div>
      </section>
    </main>
  )
}

export default Home