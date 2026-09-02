import React, { useState } from 'react'
import axios from 'axios';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, formData);
      console.log(response.data);
      alert(response.data.message);
    }catch(err){
      console.log("Error submitting contact form: ", err);
      alert(err.response.data.message);
    }
  }

  return (
    <div className="container">
      <h1 className="text-center">Contact Us</h1>
      <div className="d-flex">
        <div className="col-6 align-self-center p-5">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.6303799221655!2d72.56554087509228!3d23.037339779163407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9d2ef0e077d7%3A0x893d1817b1493105!2sBrainyBeam%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1780211447035!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <form className="col-6 p-5" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter your name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <br />
          <div className="form-group">
            <label >Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <br />
          <div className="form-group">
            <label >Subject</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter your subject" 
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
            />
          </div>
          <br />
          <div className="form-group">
            <label >Message</label>
            <textarea 
              className="form-control" 
              rows="3" 
              placeholder="Enter your message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Contact