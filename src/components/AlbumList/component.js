import React, { Component } from 'react';
import moment from 'moment';
import './AlbumList.css';

class AlbumList extends Component {

  renderAlbums() {

    return this.props.songs.map((song, i) => {

      return (
        <li onClick={() => { this.props.audioControl(song) } } className='album-item' key={ i }>
          <div>
            <div className='album-image'>
              <img src={song.track.album.images[0].url} />
            </div>
            <div className='album-details'>
              <p>{ song.track.album.name }</p>
              <p>{ song.track.album.artists[0].name }</p>
            </div>

          </div>

        </li>
      );
    })
  }

  render() {

    return (

      <ul className='album-view-container'>
        {this.renderAlbums()}
      </ul>
    );
  }
}

export default AlbumList;
