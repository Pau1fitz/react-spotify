import React from 'react';
import { createUseStyles } from 'react-jss'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';

import { setHeaderTitle } from '../../../features/uiSlice'

import { Button, Overline } from '../../atoms'
import { PlaylistHeader } from '../../molecules'

const useStyles = createUseStyles({
  sectionTitle: {
    fontSize: '40px',
    fontFamily: "'Proxima Bold', Georgia, sans-serif",
    letterSpacing: '1px',
    padding: '3px 0 5px 0',
  },

  browseHeaders: {
    display: 'flex',

    '& p': {
      color: 'rgb(179, 179, 179)',
      cursor: 'pointer',
      fontSize: '13px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      margin: '0 20px 0 0',
      position: 'relative',

      '&:hover': {
        color: '#FFFFFF',
      },
  
      '&.active:after': {
        borderBottom: '2px solid #1db954',
        content: '""',
        left: '50%',
        position: 'absolute',
        top: '22px',
        transform: 'translate(-50%, -50%)',
        width: '35px',
      }
    },
  },

  currentArtist: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',

    '& img': {
      borderRadius: '50%',
      height: '180px',
      marginRight: '20px',
      width: '180px',
    },

    '& .info > *': {
      marginBottom: '8px',
    },
  }
})

const MainHeader = ({
  artists,
  fetchCategories,
  fetchFeatured,
  fetchNewReleases,
  pauseSong,
  resumeSong,
  songPaused,
  token,
  updateViewType,
  viewType,
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const headerTitle = useSelector(state => {

    console.log(state)

    return state.ui.title
  })
  const playlists = useSelector(state => state.playlists.playlists)

  let currentArtist, currentPlaylist

  if (viewType === 'playlist') {
    currentPlaylist = playlists.filter(playlist =>
      playlist.name === headerTitle
    )[0];
  }

  if (viewType === 'Artist' && artists.length > 0) {
    currentArtist = artists.filter(artist =>
      artist.name === headerTitle
    )[0]
  }

  return (
    <>
      {viewType === 'playlist' && (
        <PlaylistHeader
          buttonAction={!songPaused ? pauseSong : resumeSong}
          buttonLabel={songPaused ? 'PLAY' : 'PAUSE'}
          currentPlaylist={currentPlaylist}
        />
      )}

      {
        (['Albums', 'Songs', 'Recently Played'].includes(headerTitle)) && (
          <h3 className={classes.sectionTitle}>{headerTitle}</h3>
        )
      }

      {
        headerTitle === 'Browse' &&
        <>
          <h3 className={classes.sectionTitle}>{headerTitle}</h3>
          <div className={classes.browseHeaders}>
            <p className={viewType === 'Genres' ? 'active' : ''} onClick={() => { fetchCategories(token); updateViewType('Genres'); dispatch(setHeaderTitle('Browse')); }}>Genres</p>
            <p className={viewType === 'New Releases' ? 'active' : ''} onClick={() => { fetchNewReleases(token); updateViewType('New Releases'); dispatch(setHeaderTitle('Browse')); }}>New Releases</p>
            <p className={viewType === 'Featured' ? 'active' : ''} onClick={() => { fetchFeatured(token); updateViewType('Featured'); dispatch(setHeaderTitle('Browse')); }}>Featured</p>
          </div>
        </>
      }

      {
        viewType === 'Artist' && currentArtist &&
        <div className={classes.currentArtist}>
          <img alt={currentArtist.name} className='current-artist-image' src={currentArtist.images[0].url} />

          <div className='info'>
            <Overline>Artist from your library</Overline>
            <h1>{currentArtist.name}</h1>

            <Button onClickAction={!songPaused ? pauseSong : resumeSong}>
              {songPaused ? 'PLAY' : 'PAUSE'}
            </Button>
          </div>
        </div>
      }
    </>
  )
}

MainHeader.propTypes = {
  artists: PropTypes.array,
  fetchCategories: PropTypes.func,
  fetchFeatured: PropTypes.func,
  fetchNewReleases: PropTypes.func,
  pauseSong: PropTypes.func,
  playlistMenu: PropTypes.array,
  playlists: PropTypes.array,
  resumeSong: PropTypes.func,
  songPaused: PropTypes.bool,
  token: PropTypes.string,
  updateViewType: PropTypes.func,
  viewType: PropTypes.string,
}

export default MainHeader
