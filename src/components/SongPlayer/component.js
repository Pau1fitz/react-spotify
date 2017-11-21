import React, { Component } from 'react';
import './SongPlayer.css';

class SongPlayer extends Component {

  render() {
    return (
      <div className='song-player-container'>

        <div className='song-controls'>

          <div className='reverse-song'>
            <i class="fa fa-step-backward reverse" aria-hidden="true"></i>
          </div>

          <div className='play-btn'>
            <i className="fa fa-play-circle-o play-btn" aria-hidden="true"></i>
          </div>

          <div className='next-song'>
            <i class="fa fa-step-forward forward" aria-hidden="true"></i>
          </div>

        </div>

        <div className='song-progress-container'>
          <div className='song-progress'></div>
        </div>

      </div>
    );
  }
}

export default SongPlayer;
