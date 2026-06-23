import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();
    const isAdmin = localStorage.getItem("userRole") === "admin" ? true : false;

    const isLoggedIn = localStorage.getItem("token") ? true : false;

    const handleSignUp = () => {
        navigate('/register')
    }

    const handleSignIn = () => {
        navigate('/login')
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse gap-3" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                isAdmin ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/manage-products">Manage_Products</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/manage-category">Manage_Category</Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/shop">Shop</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/about">About</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/contact">Contact</Link>
                                        </li>
                                    </>
                            }
                        </ul>
                        <Link to={"/profile"}>
                            <img src='/avatar-icon.svg' style={{height:"30px",width:"30px"}} />
                        </Link>
                        <Link to={"/add-to-cart"}>
                            <img src='/checkout-icon.svg' style={{height:"30px",width:"30px"}} />
                        </Link>
                        {!isLoggedIn ? (
                            <>
                                <button className="btn btn-outline-success me-2" type="submit" onClick={handleSignUp}>Sign Up</button>
                                <button className="btn btn-success" type="submit" onClick={handleSignIn}>Sign In</button>
                            </>
                        ) : (
                            <button className="btn btn-danger" type="submit" onClick={handleLogout}>Logout</button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar