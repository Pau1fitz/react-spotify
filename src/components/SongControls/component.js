import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './SongControls.css';

class SongControls extends Component {

  state = {
    timeElapsed: this.props.timeElapsed
  };

  componentWillReceiveProps(nextProps) {

    if (!nextProps.songPlaying) {
      clearInterval(this.state.intervalId);
    }

    if (nextProps.songPlaying && nextProps.timeElapsed === 0) {
      clearInterval(this.state.intervalId);
      this.calculateTime();
    }

    this.setState({
      timeElapsed: nextProps.timeElapsed
    });

  }

  calculateTime() {

    const intervalId = setInterval(() => {
      if (this.state.timeElapsed === 30) {
        clearInterval(this.state.intervalId);
        this.props.stopSong();
      } else if (!this.props.songPaused) {
        this.props.increaseSongTime(this.state.timeElapsed + 1);
      }
    }, 1000);

    this.setState({
      intervalId: intervalId
    });

  }

  getSongIndex = () => {
    const { songs, songDetails } = this.props;
    const currentIndex = songs.map((song, index) => {
      if (song.track === songDetails) {
        return index;
      } else {
        return undefined;
      }
    }).filter(item => {
      return item !== undefined;
    })[0];

    return currentIndex;
  }

  nextSong = () => {
    const { songs, audioControl } = this.props;
    let currentIndex = this.getSongIndex();
    currentIndex === songs.length - 1 ? audioControl(songs[0]) : audioControl(songs[currentIndex + 1]);
  }

  prevSong = () => {
    const { songs, audioControl } = this.props;
    let currentIndex = this.getSongIndex();
    currentIndex === 0 ? audioControl(songs[songs.length - 1]) : audioControl(songs[currentIndex - 1]);
  }

  render() {
    const showPlay = this.props.songPaused ? 'fa fa-play-circle-o play-btn' : 'fa fa-pause-circle-o pause-btn';

    return (
      <div className='song-player-container'>

        <div className='song-details'>
          <p className='song-name'>{this.props.songName}</p>
          <p className='artist-name'>{this.props.artistName}</p>
        </div>

        <div className='song-controls'>

          <div onClick={this.prevSong} className='reverse-song'>
            <i className="fa fa-step-backward reverse" aria-hidden="true" />
          </div>

          <div className='play-btn'>
            <i onClick={!this.props.songPaused ? this.props.pauseSong : this.props.resumeSong} className={"fa play-btn" + showPlay} aria-hidden="true" />
          </div>

          <div onClick={this.nextSong} className='next-song'>
            <i className="fa fa-step-forward forward" aria-hidden="true" />
          </div>

        </div>

        <div className='song-progress-container'>
          <p className='timer-start'>{moment().minutes(0).second(this.state.timeElapsed).format('m:ss')}</p>
          <div className='song-progress'>
            <div style={{ width: this.state.timeElapsed * 16.5 }} className='song-expired' />
          </div>
          <p className='timer-end'>{moment().minutes(0).second(30 - this.state.timeElapsed).format('m:ss')}</p>
        </div>

      </div>
    );
  }
}

SongControls.propTypes = {
  timeElapsed: PropTypes.number,
  songPlaying: PropTypes.bool,
  songPaused: PropTypes.bool,
  songName: PropTypes.string,
  artistName: PropTypes.string,
  stopSong: PropTypes.func,
  resumeSong: PropTypes.func,
  increaseSongTime: PropTypes.func,
  pauseSong: PropTypes.func,
  songs: PropTypes.array,
  songDetails: PropTypes.object,
  audioControl: PropTypes.func
};

export default SongControls;
