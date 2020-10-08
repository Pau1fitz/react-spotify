// @ts-nocheck
import React, { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

import { Overline } from '../../atoms'

const useStyles = createUseStyles({
  userPlaylists: {
    color: '#B3B3B3',
    padding: '20px',
    margin: '0',

    '& .sectionTitle': {
      marginBottom: '4px',
    }  
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
})

const UserPlaylists = ({
  fetchPlaylistsMenu,
  fetchPlaylistSongs,
  playlistMenu,
  title,
  token,
  updateHeaderTitle,
  userId,
}) => {
  const classes = useStyles()

  useEffect(() => {
    if (userId !== '' && token !== '') {
      fetchPlaylistsMenu(userId, token)
    }
  }, [userId, token])

  const getPlaylistSongs = (playlist) => {
    fetchPlaylistSongs(
      playlist.owner.id,
      playlist.id,
      token
    )
    updateHeaderTitle(playlist.name)
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
      <Overline className='sectionTitle'>Playlists</Overline>

      {
        playlistMenu &&
        <ul className={classes.menu}>
          {renderPlaylists()}
        </ul>
      }
    </div>
  )
}

UserPlaylists.propTypes = {
  fetchPlaylistsMenu: PropTypes.func,
  fetchPlaylistSongs: PropTypes.func,
  playlistMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  title: PropTypes.string,
  token: PropTypes.string,
  updateHeaderTitle: PropTypes.func,
  userId: PropTypes.string,
}

export default UserPlaylists
