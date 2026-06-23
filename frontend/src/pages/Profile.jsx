import React from 'react'

const Profile = () => {
  return (
    <>
      <div className="container">
        <h1>User Profile</h1>
        <h4>Full Name: {localStorage.getItem("userFullName")}</h4>
        <h4>Email: {localStorage.getItem("userEmail")}</h4>
        <h4>Role: {localStorage.getItem("userRole")}</h4>
      </div>
    </>
  )
}

export default Profile