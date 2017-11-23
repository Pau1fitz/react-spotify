import React from 'react';
import './MainHeader.css';

const MainHeader = (
  {
    pauseSong,
    resumeSong,
    fetchCategories,
    songPaused,
    headerTitle,
    viewType,
    playlists,
    token
  }) => {

  let currentPlaylist;

  if(viewType === 'playlist') {
    currentPlaylist = playlists.filter(playlist => {
      return playlist.name === headerTitle
    })[0];
  }

  return (

      <div className='section-title'>

        {viewType === 'playlist' && (

          <div className='playlist-title-container'>

            <div className='playlist-image-container'>
              <img className='playlist-image' src={currentPlaylist.images[0] ? currentPlaylist.images[0].url : null} />
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

      {(headerTitle === 'Songs'||
        headerTitle === 'Recently Played' ||
        headerTitle === 'Albums' ||
        headerTitle === 'Artists') && (
        <div>
          <h3 className='header-title'>{headerTitle}</h3>
          <button
            onClick={!songPaused ? pauseSong : resumeSong}
            className='main-pause-play-btn'>
            {songPaused ? 'PLAY' : 'PAUSE'}
          </button>
        </div>
      )}

      {headerTitle === 'Browse' && (
        <p onClick={() => fetchCategories(token)}>Browse</p>
      )}

      </div>

  );

}

export default MainHeader;
