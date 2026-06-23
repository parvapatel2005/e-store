import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const Navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [fullName,setFullName] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit= async (e)=>{
        e.preventDefault();
        
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`,{
                email,
                fullName,
                phoneNumber,
                password
            });
            alert(response.data.message);
            setEmail("");
            setFullName("");
            setPhoneNumber("");
            setPassword("");
            console.log("Registration successful:", response.data.message);
        }catch(err){
            alert(err.response.data.message);
        }
    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="col-6 m-5" style={{border:"1px solid",padding:"60px",borderRadius:"35px"}}>
                    <h1 className='text-center'>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            <div className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-control" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input type="number" className="form-control" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register