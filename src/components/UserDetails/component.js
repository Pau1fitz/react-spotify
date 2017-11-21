import React, { Component } from 'react';
import './UserDetails.css';

const UserDetails = ({displayName, userImage}) => {
  return (
    <div className='user-details-container'>
        <img className='user-image' src={userImage} />
        <p className='user-name'>{displayName}</p>
    </div>

  )
}

export default UserDetails;
