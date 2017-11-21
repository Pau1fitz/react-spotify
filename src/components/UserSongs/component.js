import React, { Component } from 'react';
import './UserSongs.css';

class UserSongs extends Component {

  componentWillReceiveProps (nextProps) {

    if(nextProps.token !== '') {
        this.props.fetchSongs(nextProps.token);
    }
  }

  msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  renderSongs() {
    return this.props.songs.map(song => {
      return (
        <li className='user-song-item' key={ song.track.id }>
          <div className='play-song'>
            <i class="fa fa-play-circle-o play-btn" aria-hidden="true"></i>
          </div>

          <div className='song-title'>
            <p>{ song.track.name }</p>
          </div>

          <div className='song-artist'>
            <p>{ song.track.artists[0].name }</p>
          </div>

          <div className='song-album'>
            <p>{ song.track.album.name }</p>
          </div>

          <div className='song-length'>
            <p>{ this.msToMinutesAndSeconds(song.track.duration_ms) }</p>
          </div>

        </li>
      );
    })
  }

  render() {

    return (
      <div className='user-songs-container'>

        <h2 className='section-title'>Songs</h2>

        <div className='song-header-container'>
          <div className='song-title-header'>
            <p>Title</p>
          </div>

          <div className='song-artist-header'>
            <p>Artist</p>
          </div>

          <div className='song-album-header'>
            <p>Album</p>
          </div>

          <div className='song-length-header'>
            <p><i class="fa fa-clock-o" aria-hidden="true"></i></p>
          </div>
        </div>

        {
          this.props.songs && this.renderSongs()
        }


      </div>
    );
  }
}

export default UserSongs;
