// @ts-nocheck
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchUser } from './actions/userActions'
import { setToken } from './actions/tokenActions'
import {
  playSong,
  stopSong,
  pauseSong,
  resumeSong,
} from './actions/songActions'

import { Player, Utility } from './components/molecules'
import { MainHeader, SideMenu } from './components/organisms'
import { MainView } from './containers'

import './App.css'

class App extends Component {
  static audio

  componentDidMount() {
    function getAuthorisationUrl() {      
      const clientId = '47e2c485aa3c47a6a39e71bb2fcf4da4'
      const redirectUri = process.env.REACT_APP_REDIRECT_URI
      const scopes = [
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'user-read-recently-played',
        'playlist-modify-private',
        'ugc-image-upload',
        'user-follow-modify',
        'user-follow-read',
        'user-library-read',
        'user-library-modify',
        'user-read-private',
        'user-read-email',
        'user-top-read',
        'user-read-playback-state'
      ]
      return `https://accounts.spotify.com/authorize?client_id=${clientId}&scope=${scopes.join('%20')}&response_type=token&redirect_uri=${redirectUri}`
    }
    function getHashParams() {
      const hashParams = {}
      const regex = /([^&;=]+)=?([^&;]*)/g
      const queries = window.location.hash.substring(1)
  
      let element = regex.exec(queries)
      while (element) {
        hashParams[element[1]] = decodeURIComponent(element[2])
        element = regex.exec(queries)
      }
      return hashParams
    }

    let hashParams = getHashParams()
    if (!hashParams.access_token) {
      window.location.href = getAuthorisationUrl()
    } else {
      this.props.setToken(hashParams.access_token)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.fetchUser(nextProps.token)
    }

    if (this.audio !== undefined) {
      this.audio.volume = nextProps.volume / 100
    }
  }

  stopSong = () => {
    if (this.audio) {
      this.props.stopSong()
      this.audio.pause()
    }
  }

  pauseSong = () => {
    if (this.audio) {
      this.props.pauseSong()
      this.audio.pause()
    }
  }

  resumeSong = () => {
    if (this.audio) {
      this.props.resumeSong()
      this.audio.play()
    }
  }

  audioControl = (song) => {
    const { playSong, stopSong } = this.props

    if (this.audio === undefined) {
      playSong(song.track)
      this.audio = new Audio(song.track.preview_url)
      this.audio.play()
    } else {
      stopSong()
      this.audio.pause()
      playSong(song.track)
      this.audio = new Audio(song.track.preview_url)
      this.audio.play()
    }
  }

  render() {
    return (
      <div className='app'>
        <div className='side-section'>
          <SideMenu />
        </div>

        <div className='main-section'>
          <Utility />

          <div className='main-section-container'>
            <MainHeader
              pauseSong={this.pauseSong}
              resumeSong={this.resumeSong}
            />{' '}
            <MainView
              pauseSong={this.pauseSong}
              resumeSong={this.resumeSong}
              audioControl={this.audioControl}
            />
          </div>
        </div>

        <Player
          stopSong={this.stopSong}
          pauseSong={this.pauseSong}
          resumeSong={this.resumeSong}
          audioControl={this.audioControl}
        />
      </div>
    )
  }
}

// App.propTypes = {
//   token: PropTypes.string,
//   fetchUser: PropTypes.func,
//   setToken: PropTypes.func,
//   pauseSong: PropTypes.func,
//   playSong: PropTypes.func,
//   stopSong: PropTypes.func,
//   resumeSong: PropTypes.func,
//   volume: PropTypes.number,
// }

const mapStateToProps = (state) => {
  return {
    token: state.tokenReducer.token,
    volume: state.soundReducer.volume,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUser,
      setToken,
      playSong,
      stopSong,
      pauseSong,
      resumeSong,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
