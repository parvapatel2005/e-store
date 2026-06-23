import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Email: ", email);
        console.log("Password: ", password);

        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,{
                email,
                password
            });
            alert(response.data.message);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userEmail", response.data.userEmail);
            localStorage.setItem("userRole", response.data.userRole);
            localStorage.setItem("userFullName", response.data.userFullName);

            navigate("/");
        }catch(err){
            alert(err.response.data.message);
        }
    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="col-6 m-5" style={{ border: "1px solid", padding: "60px", borderRadius: "35px" }}>
                    <h1 className='text-center'>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login