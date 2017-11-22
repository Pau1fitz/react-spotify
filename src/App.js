import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUser } from './actions/userActions';
import { setToken } from './actions/tokenActions';
import {
  playSong,
  stopSong
} from './actions/songActions';
import './App.css';

import UserDetails from './components/UserDetails';
import UserPlaylists from './components/UserPlaylists';
import UserSongs from './components/UserSongs';
import SongControls from './components/SongControls';
import ArtWork from './components/ArtWork';

import SideMenu from './components/SideMenu';

class App extends Component {

  static audio;

  componentWillReceiveProps(nextProps) {
    if(nextProps.token) {
      this.props.fetchUser(nextProps.token);
    }
  }

  componentDidMount() {

    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    if(!hashParams.access_token) {
        window.location.href = 'https://accounts.spotify.com/authorize?client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
    } else {
      this.props.setToken(hashParams.access_token);
    }

  }

  stopSong = () => {
    this.props.stopSong();
    this.audio.pause();
  }

  audioControl = (song) => {
    if(this.audio === undefined){
        this.props.playSong(song.track);
        this.audio = new Audio(song.track.preview_url);
        this.audio.play();
    } else {
        this.props.stopSong();
        this.audio.pause();
        this.props.playSong(song.track);
        this.audio = new Audio(song.track.preview_url);
        this.audio.play();
    }
  }

  render() {
    return (
      <div className='App'>

        <div className='app-container'>

          <div className='left-side-section'>
            <SideMenu />
            <UserPlaylists />
            <ArtWork />
          </div>

          <div className='main-section'>
            <div className='header'>
              <UserDetails />
            </div>
            <UserSongs audioControl={ this.audioControl } />
          </div>

          <div className='footer'>
            <SongControls stopSong={ this.stopSong }/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

	return {
    token: state.tokenReducer.token
	};

};

const mapDispatchToProps = dispatch => {

	return bindActionCreators({
    fetchUser,
    setToken,
    playSong,
    stopSong
  },dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
