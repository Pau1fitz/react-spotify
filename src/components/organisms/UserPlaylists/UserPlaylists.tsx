// @ts-nocheck
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createUseStyles, useTheme } from 'react-jss'

import { fetchPlaylistsMenu, fetchPlaylistSongs } from '../../../features/playlistsSlice'
import { setHeaderTitle } from './../../../features/uiSlice'

import { Overline } from '../../atoms'

const useStyles = createUseStyles((theme) => ({
  userPlaylists: {
    color: '#B3B3B3',
    padding: '20px',
    margin: '0',
  },

  sectionTitle: {
    margin: '0 0 12px',
  },

  menu: {
    fontFamily: '"Proxima Thin", sans-serif',
    listStyleType: 'none',
    margin: 0,
    marginBottom: '16px',
    padding: 0,

    '& li': {
      cursor: 'pointer',
      fontSize: '14px',
      marginBottom: '6px',
      position: 'relative',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',

      '&:hover': {
        color: '#FFFFFF',
      },
      '&.active': {
        color: '#FFFFFF',
        marginLeft: '-4px',

        '&:before': {
          borderLeft: '4px solid #1DB954',
          content: '""',
          left: '-16px',
          position: 'relative',
        }
      }
    }
  },
}))

const UserPlaylists = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles({ theme })

  const playlistMenu = useSelector(state => {
    console.log(state)

    return state.playlists.menu
  })
  const title = useSelector(state => state.ui.title)
  const token = useSelector(state => state.token.token)
  const userId = useSelector(state => state.user.userId)

  useEffect(() => {
    if (userId !== '' && token !== '') {
      fetchPlaylistsMenu(token, userId)
    }
  }, [token, userId])

  const getPlaylistSongs = (playlist) => {
    fetchPlaylistSongs(
      token,
      playlist.owner.id,
      playlist.id,
    )
    dispatch(setHeaderTitle(playlist.name))
  }

  const renderPlaylists = () => {
    return playlistMenu.map(playlist => {
      return (
        <li
          onClick={() => getPlaylistSongs(playlist)}
          className={
            title === playlist.name
              ? 'active' : ''
          }
          key={playlist.id}
        >
          {playlist.name}
        </li>
      )
    })
  }

  return (
    <div className={classes.userPlaylist}>
      <Overline className={classes.sectionTitle}>Playlists</Overline>

      {
        playlistMenu &&
          <ul className={classes.menu}>
            {renderPlaylists()}
          </ul>
      }
    </div>
  )
}

export default UserPlaylists
