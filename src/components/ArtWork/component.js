import React, { Component } from 'react';
import './ArtWork.css';

class ArtWork extends Component {

  render() {

    return (
      <div className='album-artwork-container'>
        <img className='album-artwork' src={ this.props.albumArtwork } />
      </div>
    );
  }
}

export default ArtWork;
