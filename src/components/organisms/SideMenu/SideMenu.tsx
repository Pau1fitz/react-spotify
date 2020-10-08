// @ts-nocheck
import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

import { Overline } from '../../atoms'
import { UserPlaylists } from '../.'

const useStyles = createUseStyles({
  sideMenu: {
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

const SideMenu = ({
  artistIds,
  fetchAlbums,
  fetchArtists,
  fetchFeatured,
  fetchRecentlyPlayed,
  fetchSongs,
  title,
  token,
  updateHeaderTitle,
  updateViewType,
}) => {
  const classes = useStyles()

  const handleLibraryClick = (name) => {
    updateHeaderTitle(name)
    updateViewType(name)
  }
  const handleBrowseClick = () => {
    updateHeaderTitle('Brows')
    updateViewType('Feature')
    fetchFeatured(token)
  }

  const renderLibraryMenu = () => {
    const menu = [
      {
        name: "Recently Played",
        action: fetchRecentlyPlayed
      },
      {
        name: "Songs",
        action: fetchSongs
      },
      {
        name: "Albums",
        action: fetchAlbums
      },
      {
        name: "Artists",
        action: fetchArtists,
        getArtists: true
      }
    ]

    return menu.map(item => {
      return (
        <li
          key={item.name}
          className={
            title === item.name ? "active side-menu-item" : "side-menu-item"
          }
          onClick={() => {
            item.getArtists
              ? item.action(token, artistIds)
              : item.action(token)
            handleLibraryClick(item.name)
          }}
        >
          {item.name}
        </li>
      )
    })
  }

  return (
    <div className={classes.sideMenu}>
      <ul className={classes.menu}>
        <li
          onClick={handleBrowseClick}
          className={
            title === 'Browse' ? 'active' : ''
          }
        >
          Browse
        </li>
        <li className='radio'>Radio</li>
      </ul>
    
      <Overline className='sectionTitle'>Your Library</Overline>
      <ul className={classes.menu}>
        {renderLibraryMenu()}
      </ul>

      <UserPlaylists />
    </div>
  )
}

SideMenu.propTypes = {
  artistIds: PropTypes.string,
  fetchAlbums: PropTypes.func,
  fetchArtists: PropTypes.func,
  fetchFeatured: PropTypes.func,
  fetchRecentlyPlayed: PropTypes.func,
  fetchSongs: PropTypes.func,
  title: PropTypes.string,
  token: PropTypes.string,
  updateHeaderTitle: PropTypes.func,
  updateViewType: PropTypes.func,
}

export default SideMenu
