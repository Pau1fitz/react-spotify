import React, { Component } from 'react';
import './SongPlayer.css';

class SongPlayer extends Component {

  state = {
    timeElapsed: 0
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.songPlaying) {
      this.calculateTime();
    }
  }

  calculateTime() {
    
    const intervalId  = setInterval(() => {
      if(this.state.timeElapsed === 30) {
         clearInterval(this.state.intervalId);
         this.props.stopSong();
         this.setState({
           timeElapsed: 0
         });
      } else {
        this.setState((prevState) => {
          return {
            timeElapsed: prevState.timeElapsed + 1
          }
        });
      }
    }, 1000);

    this.setState({
      intervalId: intervalId
    });

  }

  render() {

    const showPlay = !this.props.songPlaying ? ' fa-play-circle-o ' : ' fa-pause-circle-o ';

    return (
      <div className='song-player-container'>

        <div className='song-details'>
          <p className='song-name'>{ this.props.songName }</p>
          <p className='artist-name'>{ this.props.artistName }</p>
        </div>

        <div className='song-controls'>

          <div className='reverse-song'>
            <i className="fa fa-step-backward reverse" aria-hidden="true"></i>
          </div>

          <div className='play-btn'>
            <i className={"fa play-btn" + showPlay} aria-hidden="true"></i>
          </div>

          <div className='next-song'>
            <i className="fa fa-step-forward forward" aria-hidden="true"></i>
          </div>

        </div>

        <div className='song-progress-container'>
          <p className='timer-start'>{ this.state.timeElapsed }</p>
          <div className='song-progress'>
            <div style={{ width: this.state.timeElapsed * 16.5 }} className='song-expired'></div>
          </div>
          <p className='timer-end'>{ 30 - this.state.timeElapsed }</p>
        </div>

      </div>
    );
  }
}

export default SongPlayer;
