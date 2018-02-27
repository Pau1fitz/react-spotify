import React from 'react';
import PropTypes from 'prop-types';
import './ArtWork.css';

const ArtWork = (albumArtwork) => {
  return (
    <div className='album-artwork-container'>
      <img className='album-artwork' src={ albumArtwork.albumImage } />
    </div>
  );
};

ArtWork.propTypes = {
  albumArtwork: PropTypes.string
};

export default ArtWork;
