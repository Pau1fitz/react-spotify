// @ts-nocheck
import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { Overline } from '../../atoms'
import { UserPlaylists } from '../.'

const useStyles = createUseStyles({
  sideMenu: {
    color: '#B3B3B3',
    padding: '20px',
    margin: '0',
  },

  sectionTitle: {
    margin: '0 0 12px',
  },

  homeSection: {
    gridArea: 'topRow1 / secondaryCol / mainRow / secondaryCol',
    padding: '20px',
  },
  playlistSection: {
    gridArea: 'mainRow / secondaryCol / mainRow / secondaryCol',
    overflow: 'hidden',
    padding: '20px',
    paddingBottom: '0',
    paddingRight: 0,
  },
  scrollingPane: {
    height: '100%',
    overflowY: 'auto',
    marginBottom: '60px',
    paddingRight: '20px',
    textAlign: 'justify',
  },

  menu: {
    fontFamily: '"Proxima Thin", sans-serif',
    listStyleType: 'none',
    margin: 0,
    marginBottom: '28px',
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
    updateHeaderTitle('Browse')
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
    <>
      <div className={classes.homeSection}>
        <ul className={classes.menu}>
          <li>Home</li>
          <li
            onClick={handleBrowseClick}
            className={clsx(
              title === 'Browse' && 'active'
            )}
          >
            Browse
          </li>
          <li className='radio'>Radio</li>
        </ul>
      </div>

      <div className={classes.playlistSection}>
        <div className={classes.scrollingPane}>

          <Overline className={classes.sectionTitle}>Your Library</Overline>
          <ul className={classes.menu}>
            {renderLibraryMenu()}
          </ul>

          <UserPlaylists />
        </div>
      </div>
    </>
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
