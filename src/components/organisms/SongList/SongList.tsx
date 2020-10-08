// @ts-nocheck
import React, { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import key from 'weak-key'
import moment from 'moment'

const useStyles = createUseStyles({
  songList: {
    '& .song-header': {
      borderBottom: '1px solid #666666',
      display: 'flex',
      marginTop: '20px',
      paddingBottom: '6px',
    },
    '& .section-title': {
      fontFamily: '"Proxima Bold", Georgia, sans-serif',
      fontSize: '34px',
      fontWeight: '800',
      padding: '0 0 20px 0',
    },
    '& .main-pause-play-btn': {
      background: '#1DB954',
      border: 'none',
      borderRadius: '20px',
      color: '#FFFFFF',
      cursor: 'pointer',
      fontSize: '14px',
      fontFamily: '"Proxima Nova", Georgia, sans-serif',
      letterSpacing: '1px',
      outline: 'none',
      padding: '10px',
      width: '100px',
    },
    '& .song-row': {
      borderBottom: '1px solid #666',
      cursor: 'pointer',
      display: 'flex',
      fontSize: '14px',
      lineHeight: '40px',
      listStyleType: 'none',
    },
    '& .song-row:hover': {
      background: '#333333',
    },
    '& .active.song-row': {
      color: '#1DB954',
      background: '#333333',
    },
    '& .add-song': {
      color: '#FFFFFF',
    },
    '& .song-row:hover > .play-song': {
      opacity: 1,
    },
    '& .song-title-col': {
      width: '300px',
    },
    '& .song-album-col': {
      width: '250px',
    },
    '& .song-artist-col': {
      width: '200px',
    },
    '& .song-added-col': {
      width: '80px',
    },
    '& .song-length-col': {
      width: '60px',
    },
    '& .song-title-header': {
      marginLeft: '60px',
    },
    '& .song-row .play-song': {
      opacity: 0,
      textAlign: 'center',
      width: '40px',
    },
    '& .song-row  .play-song .fa': {
      color: '#CCCCCC',
      cursor: 'pointer',
      fontSize: '30px',
      position: 'relative',
      top: '5px',
      '-webkit-text-stroke': '2px #181818',
    },
    '& .play-song .fa:hover': {
      color: '#FFFFFF',
    },
    '& .song-row p': {
      lineHeight: '42px',
      overflow: 'hidden',
      padding: '0 8px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '& .song-header p': {
      color: '#CCCCCC',
      fontFamily: '"Proxima Thin", Georgia, sans-serif',
      fontSize: '12px',
      padding: '0 8px',
      textTransform: 'uppercase',
    },
    '& .song-length-header .fa-clock-o': {
      color: '#CCCCCC',
      fontSize: '17px',
    },
    '& .song-added-header': {
      color: '#CCCCCC',
      width: '80px',
    },
    '& .add-song': {
      cursor: 'pointer',
      fontSize: '20px',
      width: '20px',
      zIndex: '1',
    },
    '& .add-song .fa': {
      '-webkit-text-stroke': '3px #181818',
    },
    '& .add-song .fa:hover': {
      '-webkit-text-stroke': '2px #181818',
    },
  }
})

const SongList = ({
  addSongToLibrary,
  audioControl,
  fetchPlaylistSongsPending,
  fetchSongs,
  fetchSongsError,
  fetchSongsPending,
  pauseSong,
  resumeSong,
  songAddedId,
  songId,
  songPaused,
  songPlaying,
  songs,
  token,
  viewType,
}) => {
  const classes = useStyles()

  useEffect(() => {
    if (
      token !== '' &&
      !fetchSongsError &&
      fetchSongsPending &&
      viewType === 'songs'
    ) {
      fetchSongs(token)
    }
  }, [fetchSongsError, fetchSongsPending, token, viewType])

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  const renderSongsTable = () => {
    return songs.map((song) => {
      const buttonClass =
        song.track.id === songId && !songPaused
          ? 'fa-pause-circle-o'
          : 'fa-play-circle-o'

      return (
        <li
          className={clsx(
            'song-row',
            song.track.id === songId && 'active'
          )}
          key={key(song)}
        >
          <div
            onClick={() => {
              song.track.id === (songId && songPlaying && songPaused)
                ? resumeSong()
                : (songPlaying && !songPaused && song.track.id === songId)
                  ? pauseSong()
                  : audioControl(song)
            }}
            className='play-song'
          >
            <i className={`fa ${buttonClass} play-btn`} aria-hidden='true' />
          </div>

          {viewType !== 'songs' && (
            <p
              className='add-song'
              onClick={() => {
                addSongToLibrary(token, song.track.id)
              }}
            >
              {songAddedId === song.track.id ? (
                <i className='fa fa-check add-song' aria-hidden='true' />
              ) : (
                  <i className='fa fa-plus add-song' aria-hidden='true' />
                )}
            </p>
          )}

          {viewType === 'songs' && (
            <p className='add-song'>
              <i className='fa fa-check' aria-hidden='true' />
            </p>
          )}

          <div className='song-title-col'>
            <p>{song.track.name}</p>
          </div>

          <div className='song-artist-col'>
            <p>{song.track.artists[0].name}</p>
          </div>

          <div className='song-album-col'>
            <p>{song.track.album.name}</p>
          </div>

          <div className='song-added-col'>
            <p>{moment(song.added_at).format('YYYY-MM-DD')}</p>
          </div>

          <div className='song-length-col'>
            <p>{msToMinutesAndSeconds(song.track.duration_ms)}</p>
          </div>
        </li>
      )
    })
  }

  return (
    <div className={classes.songList}>
      <div className='song-header'>
        <div className='song-title-col song-title-header'>
          <p>Title</p>
        </div>
        <div className='song-artist-col song-artist-header'>
          <p>Artist</p>
        </div>
        <div className='song-album-col song-album-header'>
          <p>Album</p>
        </div>
        <div className='song-added-col song-added-header'>
          <i className='fa fa-calendar-plus-o' aria-hidden='true' />
        </div>
        <div className='song-length-col song-length-header'>
          <p>
            <i className='fa fa-clock-o' aria-hidden='true' />
          </p>
        </div>
      </div>

      {
        (songs && !fetchSongsPending && !fetchPlaylistSongsPending) &&
        renderSongsTable()
      }
    </div>
  )
}

SongList.propTypes = {
  addSongToLibrary: PropTypes.func,
  audioControl: PropTypes.func,
  fetchPlaylistSongsPending: PropTypes.bool,
  fetchSongs: PropTypes.func,
  fetchSongsError: PropTypes.bool,
  fetchSongsPending: PropTypes.bool,
  pauseSong: PropTypes.func,
  resumeSong: PropTypes.func,
  songAddedId: PropTypes.string,
  songId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  songPaused: PropTypes.bool,
  songPlaying: PropTypes.bool,
  songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  token: PropTypes.string,
  viewType: PropTypes.string,
}

export default SongList
