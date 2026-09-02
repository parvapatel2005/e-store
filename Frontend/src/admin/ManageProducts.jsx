import React from 'react'
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../service/axiosInstance';

const ManageProducts = () => {

  const fileInputRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [editId, setEditId] = useState();
  const [error, setError] = useState('');

  const fetchProducts = async() => {
      try{
          const response = await axiosInstance.get('/api/products/list-product');
          setProducts(response.data.products);
          console.log("Product:", response.data.products);
          setError('');
      }catch(error){
          console.error("Error fetching products:", error);
          setError('Failed to fetch products');
      }
  };

  useEffect(() => {
      fetchProducts();
  }, []);

  const fetchCategory = async() => {
      try{
          const response = await axiosInstance.get('/api/category/list-category');
          console.log("Category:", response.data.category);
          setCategory(response.data.category);
          setError('');
      }catch(error){
          console.error("Error fetching categories:", error);
          setError('Failed to fetch categories');
      }
  };

  useEffect(() => {
      fetchCategory();
  }, []); 

  const [formData, setFormData] = useState({
    productName: '',
    image: null,
    description: '',
    price: 0,
    categories: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.productName.trim()) {
      setError('Product name is required');
      return;
    }

    if (!formData.categories) {
      setError('Please select a category');
      return;
    }

    if (!editId && !formData.image) {
      setError('Image is required for new products');
      return;
    }

    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }

    if (!formData.price || formData.price <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    console.log(formData);

    const form = new FormData();
    form.append('productName', formData.productName);
    if (formData.image) {
      form.append('image', formData.image);
    }
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('categories', formData.categories);

    try{
      let response;
      if(editId){
        response = await axiosInstance.put(`/api/products/update-product/${editId}`, form);
      }
      else{
        response = await axiosInstance.post('/api/products/add-product', form);
      }
      
      console.log(response.data);
      alert(response.data.message);

      setFormData({
        productName: '',
        image: null,
        description: '',
        price: 0,
        categories: ''
      });

      if(fileInputRef.current){
        fileInputRef.current.value = null;
      }
      
      setEditId(null);
      setError('');
      fetchProducts();
    }catch(err){
      console.log('Error:', err);
      const errorMessage = err.response?.data?.message || 'Error adding/updating product';
      setError(errorMessage);
      alert(errorMessage);
    }
  }

  const handleDelete = async (id) => {
    try{
      const response = await axiosInstance.delete(`/api/products/delete-product/${id}`);
      alert(response.data.message);
      fetchProducts();
    }catch(err){
      alert("Error deleting product: ",err);
    }   
  }

  const handleEdit = async (product) => {
    try{
      setEditId(product._id);

      setFormData({
        productName: product.productName,
        image: null,
        description: product.description,
        price: product.price,
        categories: product.categories.categoryName
      });
    }catch(err){
      alert("Error editing product: ",err);
    }
  }

  return (
    <>
      <div className="container">
        <h1>Manage Products</h1>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Product Name:</label>
          <input className="form-control" type="text" name="productName" value={formData.productName} onChange={(e) => setFormData({...formData, productName: e.target.value})} required /><br />

          <label>Select Category:</label><br/>
          <select onChange={(e)=>setFormData({...formData,categories:e.target.value})} value={formData.categories} className="form-control">
              <option>Select Category</option>
              {
                category?.map((item)=>(
                  <option value={item?._id} key={item?._id}>{item?.categoryName}</option>
                ))
              }
          </select><br />

          <label>Image:</label>
          <input className="form-control" type="file" name="image" ref={fileInputRef} onChange={(e) => setFormData({...formData, image: e.target.files[0]})} /><br />

          <label>Description:</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea><br />

          <label>Price:</label>
          <input className="form-control" type="number" name="price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} /><br />

          <button className="btn btn-primary" type="submit">{editId ? 'Update Product' : 'Add Product'}</button>
        </form>

        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Category Name</th>
              <th scope="col">Image</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item) => {
              return (
                <tr key={item?._id}>
                  <td>{item?.productName}</td>
                  <td>{item?.categories.categoryName}</td>
                  <td><img src={item.image} alt={item?.productName} width="100" /></td>
                  <td>{item?.description}</td>
                  <td>${item?.price}</td>
                  <td>
                    <button className="btn btn-warning me-2" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item?._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ManageProducts