import React from 'react';
import PropTypes from 'prop-types';
import './ArtWork.css';

const ArtWork = (albumArtwork) => (
  <div className="album-artwork-container">
    {albumArtwork.albumImage ? (
      <img
        alt="artwork"
        className="album-artwork"
        src={albumArtwork.albumImage}
      />
    ) : //basically display nothing
    null}
  </div>
);

ArtWork.propTypes = {
  albumArtwork: PropTypes.string,
};

export default ArtWork;
