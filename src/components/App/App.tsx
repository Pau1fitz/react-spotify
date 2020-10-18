// @ts-nocheck
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createUseStyles, useTheme } from 'react-jss'
import clsx from 'clsx'

import {
  pausePlayback,
  resetPlayback,
  resumePlayback,
  startPlayback,
} from '../../features/playerSlice'
import { setToken } from '../../features/tokenSlice'
import { fetchUser } from '../../features/userSlice'

import { MainView } from '../../containers'
import { Utility } from '../molecules'
import { MainHeader, PlayerBar, SideMenu } from '../organisms'

const cssBaseline = {
  margin: 0,
  padding: 0,
}

let htmlAudio

const useStyles = createUseStyles((theme) => ({
  app: {
    background: theme.palette.grey[8],
    color: theme.palette.white.primary,
    display: 'grid',
    fontFamily: theme.typography.family.normal,
    gridTemplateColumns: '[secondaryCol] minmax(200px, 1fr) [mainCol] 5fr',
    gridTemplateRows: '[topRow1] 50px [topRow2] 60px [mainRow] 1fr [baseRow] 80px',
    height: '100vh',
    width: '100vw',
  },

  mainViewSection: {
    background: `linear-gradient(180deg, ${theme.palette.grey[4]} 0%, ${theme.palette.grey[8]} 10%)`,
    gridArea: 'topRow2 / mainCol / baseRow / mainCol',
    overflow: 'hidden',
    padding: '0 20px',
  },
  scrollingPane: {
    height: '100%',
    overflowY: 'auto',
    marginBottom: '60px',
  },
}))

const App = () => {
  const theme = useTheme()
  const classes = useStyles({ theme })
  const dispatch = useDispatch()

  const token = useSelector(state => state.token.token)
  const volume = useSelector(state => state.player.volume)

  useEffect(() => {
    function getAuthorisationUrl() {
      const clientId = process.env.REACT_APP_CLIENT_ID
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
      dispatch(setToken(hashParams.access_token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    Object.keys(cssBaseline).map((styleKey) =>
      document.body.style[styleKey] = cssBaseline[styleKey]
    )
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchUser, token])

  useEffect(() => {
    if (!!htmlAudio) {
      htmlAudio.play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlAudio])

  useEffect(() => {
    if (htmlAudio !== undefined) {
      htmlAudio.volume = volume / 100
    }
  }, [volume])

  const handleStopSong = () => {
    if (htmlAudio) {
      htmlAudio.pause()
      dispatch(resetPlayback())
    }
  }
  const handlePauseSong = () => {
    if (htmlAudio) {
      htmlAudio.pause()
      dispatch(pausePlayback())
    }
  }
  const handleResumeSong = () => {
    if (htmlAudio) {
      htmlAudio.play()
      dispatch(resumePlayback())
    }
  }

  const audioController = (song) => {
    if (htmlAudio !== undefined) {
      htmlAudio.pause()
      dispatch(resetPlayback())
    }

    htmlAudio = new Audio(song.track.preview_url)
    htmlAudio.volume = volume / 100
    htmlAudio.play()
    dispatch(startPlayback(song.track))
  }

  const mainViewStyling = clsx(
    classes.mainViewSection,
    classes.scrollingPane,
  )

  return (
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

      <PlayerBar
        audioControl={audioController}
        pauseSong={handlePauseSong}
        resumeSong={handleResumeSong}
        stopSong={handleStopSong}
      />
    </div>
  )
}

export default App
