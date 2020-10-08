import React from 'react';
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types';

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
  headerTitle,
  pauseSong,
  playlists,
  resumeSong,
  songPaused,
  token,
  updateHeaderTitle,
  updateViewType,
  viewType,
}) => {
  const classes = useStyles()

  let currentPlaylist;
  let currentArtist;

  if (viewType === 'playlist') {
    currentPlaylist = playlists.filter(playlist => {
      return playlist.name === headerTitle;
    })[0];
  }

  if (viewType === 'Artist' && artists.length > 0) {
    currentArtist = artists.filter(artist => {
      return artist.name === headerTitle;
    })[0];
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
            <p className={viewType === 'Genres' ? 'active' : ''} onClick={() => { fetchCategories(token); updateViewType('Genres'); updateHeaderTitle('Browse'); }}>Genres</p>
            <p className={viewType === 'New Releases' ? 'active' : ''} onClick={() => { fetchNewReleases(token); updateViewType('New Releases'); updateHeaderTitle('Browse'); }}>New Releases</p>
            <p className={viewType === 'Featured' ? 'active' : ''} onClick={() => { fetchFeatured(token); updateViewType('Featured'); updateHeaderTitle('Browse'); }}>Featured</p>
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
  headerTitle: PropTypes.string,
  pauseSong: PropTypes.func,
  playlistMenu: PropTypes.array,
  playlists: PropTypes.array,
  resumeSong: PropTypes.func,
  songPaused: PropTypes.bool,
  token: PropTypes.string,
  updateHeaderTitle: PropTypes.func,
  updateViewType: PropTypes.func,
  viewType: PropTypes.string,
}

export default MainHeader
