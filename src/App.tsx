// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { ThemeProvider } from 'theming'
import clsx from 'clsx'

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
import { SpotifyDark } from './theme'

const cssBaseline = {
  backgroundColor: '#040404',
  color: '#FFFFFF',
  fontFamily: '#000000',
  margin: 0,
  padding: 0,
}

const useStyles = createUseStyles({
  app: {
    display: 'grid',
    gridTemplateColumns: '[secondaryCol] minmax(200px, 1fr) [mainCol] 5fr',
    gridTemplateRows: '[topRow1] 50px [topRow2] 60px [mainRow] 1fr [baseRow] 80px',
    height: '100vh',
    width: '100vw',

    background: '#040404',
    color: '#FFFFFF',
    fontFamily: '"Proxima Nova", sans-serif',
  },

  mainViewSection: {
    background: 'linear-gradient(180deg, #404040 0%, #121212 10%)',
    gridArea: 'topRow2 / mainCol / baseRow / mainCol',
    overflow: 'hidden',
    padding: '0 20px',
  },
  scrollingPane: {
    height: '100%',
    overflowY: 'auto',
    marginBottom: '60px',
  },
})

const App = ({
  fetchUser,
  pauseSong,
  playSong,
  resumeSong,
  setToken,
  stopSong,
  token,
  volume,
}) => {
  const classes = useStyles()

  const [htmlAudioObj, setHtmlAudioObj] = useState(undefined)

  useEffect(() => {
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
      setToken(hashParams.access_token)
    }
  }, [])

  useEffect(() => {
    Object.keys(cssBaseline).map((styleKey) => {
      document.body.style[styleKey] = cssBaseline[styleKey]
    })
  }, [])

  useEffect(() => {
    if (token) {
      fetchUser(token)
    }
  }, [fetchUser, token])

  useEffect(() => {
    if (htmlAudioObj) {
      htmlAudioObj.play()
    }
  }, [htmlAudioObj])

  useEffect(() => {
    if (htmlAudioObj !== undefined) {
      htmlAudioObj.volume = volume / 100
    }
  }, [htmlAudioObj, volume])

  const handleStopSong = () => {
    if (htmlAudioObj) {
      stopSong()
      htmlAudioObj.pause()
    }
  }
  const handlePauseSong = () => {
    if (htmlAudioObj) {
      pauseSong()
      htmlAudioObj.pause()
    }
  }
  const handleResumeSong = () => {
    if (htmlAudioObj) {
      resumeSong()
      htmlAudioObj.play()
    }
  }

  const audioController = (song) => {
    if (!!htmlAudioObj) {
      stopSong()
      htmlAudioObj.pause()
    }

    playSong(song.track)
    setHtmlAudioObj(new Audio(song.track.preview_url))
  }

  const mainViewStyling = clsx(
    classes.mainViewSection,
    classes.scrollingPane,
  )
  return (
    <ThemeProvider theme={SpotifyDark}>
      <div className={classes.app}>
        <SideMenu />

        <Utility />

        <div className={mainViewStyling}>
          <MainHeader
            pauseSong={handlePauseSong}
            resumeSong={handleResumeSong}
          />
          <MainView
            audioControl={audioController}
            pauseSong={handlePauseSong}
            resumeSong={handleResumeSong}
          />
        </div>

        <Player
          audioControl={audioController}
          pauseSong={handlePauseSong}
          resumeSong={handleResumeSong}
          stopSong={handleStopSong}
        />
      </div>
    </ThemeProvider>
  )
}

App.propTypes = {
  fetchUser: PropTypes.func,
  pauseSong: PropTypes.func,
  playSong: PropTypes.func,
  resumeSong: PropTypes.func,
  setToken: PropTypes.func,
  stopSong: PropTypes.func,
  token: PropTypes.string,
  volume: PropTypes.number,
}

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
      pauseSong,
      playSong,
      resumeSong,
      setToken,
      stopSong,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
