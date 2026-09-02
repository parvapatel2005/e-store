import React from 'react'
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../service/axiosInstance';

const ManageCategory = () => {

  const fileInputRef = useRef(null);

  const [category, setCategory] = useState([]);
  const [editId, setEditId] = useState();
  const [error, setError] = useState('');

  const fetchCategory = async() => {
      try{
          const response = await axiosInstance.get('/api/category/list-category');
          console.log("Category:", response.data.category);
          setCategory(response.data.category);
          setError('');
      }catch(error){
          console.error("Error fetching products:", error);
          setError('Failed to fetch categories');
      }
  };

  useEffect(() => {
      fetchCategory();
  }, []); 

  const [formData, setFormData] = useState({
    categoryName: '',
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.categoryName.trim()) {
      setError('Category name is required');
      return;
    }

    if (!editId && !formData.image) {
      setError('Image is required for new categories');
      return;
    }

    console.log(formData);

    const form = new FormData();
    form.append('categoryName', formData.categoryName);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try{
      let response;
      if(editId){
        response = await axiosInstance.put(`/api/category/update-category/${editId}`, form);
      }
      else{
        response = await axiosInstance.post('/api/category/add-category', form);
      }
      
      console.log(response.data);
      alert(response.data.message);

      setFormData({
        categoryName: '',
        image: null,
      });

      if(fileInputRef.current){
        fileInputRef.current.value = null;
      }
      
      setEditId(null);
      setError('');
      fetchCategory();
    }catch(err){
      console.log('Error:', err);
      const errorMessage = err.response?.data?.message || 'Error adding/updating category';
      setError(errorMessage);
      alert(errorMessage);
    }
  }

  const handleDelete = async (id) => {
    try{
      const response = await axiosInstance.delete(`/api/category/delete-category/${id}`);
      alert(response.data.message);
      fetchCategory();
    }catch(err){
      alert("Error deleting category: ",err);
    }   
  }

  const handleEdit = async (category) => {
    try{
      setEditId(category._id);

      setFormData({
        categoryName: category.categoryName,
        image: null,
      });
    }catch(err){
      alert("Error editing category: ",err);
    }
  }

  return (
    <>
      <div className="container">
        <h1>Manage Category</h1>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Category Name:</label>
          <input className="form-control" type="text" name="categoryName" value={formData.categoryName} onChange={(e) => setFormData({...formData, categoryName: e.target.value})} required /><br />

          <label>Image:</label>
          <input className="form-control" type="file" name="image" ref={fileInputRef} onChange={(e) => setFormData({...formData, image: e.target.files[0]})} /><br />

          <button className="btn btn-primary" type="submit">{editId ? 'Update Category' : 'Add Category'}</button>
        </form>

        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.map((item,index) => {
              return (
                <tr key={item._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.categoryName}</td>
                  <td><img src={item.image} alt={item.categoryName} width="100" />
                  </td>
                  <td>
                    <button className="btn btn-warning me-2" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
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

export default ManageCategory