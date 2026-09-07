import React from 'react'

const Profile = () => {
  const fullName = localStorage.getItem("userFullName") || "NexCart shopper";
  const email = localStorage.getItem("userEmail") || "Email not available";

  return (
    <main className="profile-page container">
      <section className="profile-card">
        <div className="profile-banner" aria-hidden="true" />
        <div className="profile-content">
          <div className="profile-avatar" aria-hidden="true">
            {fullName.charAt(0).toUpperCase()}
          </div>
          <span className="eyebrow">Your NexCart account</span>
          <h1>{fullName}</h1>
          <p className="profile-welcome">Welcome back. Your shopping details are kept here in one simple place.</p>

          <div className="profile-details">
            <div className="profile-detail">
              <span className="profile-detail-label">Full name</span>
              <strong>{fullName}</strong>
            </div>
            <div className="profile-detail">
              <span className="profile-detail-label">Email address</span>
              <strong>{email}</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Profile