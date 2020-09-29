import React from 'react';
// import PropTypes from 'prop-types';

import './MainHeader.css';

const MainHeader = ({
  pauseSong,
  resumeSong,
  fetchCategories,
  fetchNewReleases,
  fetchFeatured,
  updateHeaderTitle,
  updateViewType,
  songPaused,
  headerTitle,
  viewType,
  playlists,
  token,
  artists
}) => {

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

    <div className='section-title'>
      {viewType === 'playlist' && (
        <div className='playlist-title-container'>
          <div className='playlist-image-container'>
            <img alt="playlist" className='playlist-image' src={currentPlaylist.images[0] ? currentPlaylist.images[0].url : null} />
          </div>
          <div className='playlist-info-container'>
            <p className='playlist-text'>PLAYLIST</p>
            <h3 className='header-title'>{headerTitle}</h3>
            <p className='created-by'>Created By: <span className='lighter-text'>{currentPlaylist.owner.display_name}</span> - {currentPlaylist.tracks.total} songs</p>
            <button
              onClick={!songPaused ? pauseSong : resumeSong}
              className='main-pause-play-btn'>
              {songPaused ? 'PLAY' : 'PAUSE'}
            </button>

          </div>
        </div>
      )}

      {viewType === 'Artist' && currentArtist && (
        <div>
          <div className='current-artist-header-container'>
            <img alt="current-artist" className='current-artist-image' src={currentArtist.images[0].url} />
            <div className='current-artist-info'>
              <p>Artist from your library</p>
              <h3>{currentArtist.name}</h3>
            </div>
          </div>
          <button
            onClick={!songPaused ? pauseSong : resumeSong}
            className='main-pause-play-btn artist-button'>
            {songPaused ? 'PLAY' : 'PAUSE'}
          </button>
        </div>
      )}

      {(
        headerTitle === 'Songs' ||
        headerTitle === 'Recently Played' ||
        headerTitle === 'Albums' ||
        headerTitle === 'Artists') && (
          <div>
            <h3 className='header-title'>{headerTitle}</h3>
            {headerTitle !== 'Artists' && (
              <button
                onClick={!songPaused ? pauseSong : resumeSong}
                className='main-pause-play-btn'>
                {songPaused ? 'PLAY' : 'PAUSE'}
              </button>
            )}

          </div>
        )}
      {(headerTitle === 'Browse') && (
        <div>
          <h3 className='header-title'>{headerTitle}</h3>
          <div className='browse-headers'>
            <p className={viewType === 'Genres' ? 'active' : ''} onClick={() => { fetchCategories(token); updateViewType('Genres'); updateHeaderTitle('Browse'); }}>Genres</p>
            <p className={viewType === 'New Releases' ? 'active' : ''} onClick={() => { fetchNewReleases(token); updateViewType('New Releases'); updateHeaderTitle('Browse'); }}>New Releases</p>
            <p className={viewType === 'Featured' ? 'active' : ''} onClick={() => { fetchFeatured(token); updateViewType('Featured'); updateHeaderTitle('Browse'); }}>Featured</p>
          </div>
        </div>
      )}
    </div>

  );

};

// MainHeader.propTypes = {
//   pauseSong: PropTypes.func,
//   resumeSong: PropTypes.func,
//   fetchCategories: PropTypes.func,
//   fetchNewReleases: PropTypes.func,
//   fetchFeatured: PropTypes.func,
//   updateHeaderTitle: PropTypes.func,
//   updateViewType: PropTypes.func,
//   songPaused: PropTypes.bool,
//   headerTitle: PropTypes.string,
//   viewType: PropTypes.string,
//   playlists: PropTypes.array,
//   playlistMenu: PropTypes.array,
//   token: PropTypes.string,
//   artists: PropTypes.array,
// };

export default MainHeader;
