import React, { Component } from 'react';
import './MainHeader.css';

class MainHeader extends Component {

  render() {

    return (
      <div>

        <h2 className='section-title'>Songs</h2>
        <button
          onClick={this.props.pauseSong}
          className='main-pause-play-btn'>
          {!this.props.songPlaying ? 'PLAY' : 'PAUSE'}
        </button>

      </div>
    );
  }
}

export default MainHeader;
