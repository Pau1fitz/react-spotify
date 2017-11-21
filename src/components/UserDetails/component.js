import React, { Component } from 'react';
import './UserDetails.css';

class UserDetails extends Component {


  render() {

    return (
      <div className='user-details-container'>
          <img alt='user' className='user-image' src={this.props.userImage} />
          <p className='user-name'>{this.props.displayName}</p>
      </div>
    )

  }
}

export default UserDetails;
