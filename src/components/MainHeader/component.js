import React, { Component } from 'react';
import './MainHeader.css';

const MainHeader = ({pauseSong, songPlaying}) => {

  return (
    <div>
      <h2 className='section-title'>Songs</h2>
      <button
        onClick={pauseSong}
        className='main-pause-play-btn'>
        {!songPlaying ? 'PLAY' : 'PAUSE'}
      </button>
    </div>
  );

}

export default MainHeader;
