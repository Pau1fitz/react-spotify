import React, { Component } from 'react';
import './UserPlaylists.css';

class UserPlaylists extends Component {

  componentWillReceiveProps (nextProps) {

    if(nextProps.userId !== '' && nextProps.token !== '') {
        this.props.fetchPlaylists(nextProps.userId, nextProps.token);
    }
  }

  renderPlaylists() {
    return this.props.playlists.map(playlist => {

      const getPlaylistSongs = () => {
        this.props.fetchPlaylistSongs(this.props.userId, playlist.id, this.props.token);
      }

      return (
        <li onClick={ getPlaylistSongs } className='user-playlist-item' key={ playlist.id }>
          { playlist.name }
        </li>
      );
    })
  }

  render() {

    return (
      <div className='user-playlist-container'>
        <h3 className='user-playlist-header'>Playlists</h3>
        {
          this.props.playlists && this.renderPlaylists()
        }

      </div>
    );
  }
}

export default UserPlaylists;
