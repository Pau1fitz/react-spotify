// @ts-nocheck
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import key from 'weak-key'
import moment from 'moment'

import { Icon } from '../../atoms'
import { 
  resetPlayback
} from '../../../features/playerSlice'
import { 
  // fetchPlaylistSongsPending,
  fetchSongs,
  fetchSongsError,
  fetchSongsPending
} from '../../../features/songsSlice'
import { addSongToLibrary } from '../../../features/userSlice'

const useStyles = createUseStyles({
  songList: {
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

    '& .song-header': {
      borderBottom: '1px solid #666666',
      display: 'flex',
      marginTop: '20px',
      paddingBottom: '6px',

      '& p': {
        color: '#CCCCCC',
        fontFamily: '"Proxima Thin", Georgia, sans-serif',
        fontSize: '12px',
        padding: '0 8px',
        textTransform: 'uppercase',
      },

      '& .song-title-header': {
        marginLeft: '60px',
      },
      '& .song-length-header .fa-clock-o': {
        color: '#CCCCCC',
        fontSize: '17px',
      },
      '& .song-added-header': {
        color: '#CCCCCC',
        width: '80px',
      },
    },

    '& .song-row': {
      borderBottom: '1px solid #666',
      cursor: 'pointer',
      display: 'flex',
      fontSize: '14px',
      lineHeight: '40px',
      listStyleType: 'none',

      '&.active': {
        color: '#1DB954',
        background: '#333333',
      },

      '&:hover': {
        background: '#333333',

        '& > .play-song': {
          opacity: 1,
        },  
      },

      '& .play-song': {
        opacity: 0,
        textAlign: 'center',
        width: '40px',

        '& .fa': {
          color: '#CCCCCC',
          cursor: 'pointer',
          fontSize: '30px',
          position: 'relative',
          top: '5px',
          '-webkit-text-stroke': '2px #181818',

          '&:hover': {
            color: '#FFFFFF',
          },
        },
      },

      '& p': {
        lineHeight: '42px',
        overflow: 'hidden',
        padding: '0 8px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },

    '& .play-btn': {
      color: '#FFFFFF',
      cursor: 'pointer',
      fontSize: '20px',
    },
    '& .add-song': {
      color: '#FFFFFF',
      cursor: 'pointer',
      fontSize: '20px',
      width: '20px',
      zIndex: '1',

      '& .fa': {
        '-webkit-text-stroke': '3px #181818',

        '&:hover': {
          '-webkit-text-stroke': '2px #181818',
        },  
      },
    },
  }
})

const SongList = ({ audioControl, resumeSong, pauseSong }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const songAddedId = useSelector(state => state.user.songId)
  const viewType = useSelector(state => state.songs.viewType)
  const token = useSelector(state => state.token.token)
  const songs = useSelector(state => state.songs.songs)

  const { trackId, trackPaused } = useSelector(state => state.player)

  useEffect(() => {
    if (
      token !== '' &&
      !fetchSongsError &&
      fetchSongsPending &&
      viewType === 'songs'
    ) {
      fetchSongs(token)
    }
  }, [fetchSongs, fetchSongsError, fetchSongsPending, token, viewType])

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  const handlePlaybackLink = (song) => {
    if (song.track.id !== trackId) {
      dispatch(resetPlayback())
      audioControl(song)
    }
    else if (!!trackId && trackPaused) {
      resumeSong()
    }
    else if (!!trackId && !trackPaused) {
      pauseSong()
    }
  }

  const renderSongsTable = () => {
    return songs.map((song) => {
      const buttonIcon =
        trackId === song.track.id && !trackPaused
          ? 'pause-circle'
          : 'play-circle'

      const songRowStyles = clsx(
        'song-row',
        trackId === song.track.id && 'active'
      )

      return (
        <li
          className={songRowStyles}
          key={key(song)}
        >
          <div
            onClick={() => handlePlaybackLink(song)}
            className='play-song'
          >
            <Icon name={buttonIcon} className='play-btn' />
          </div>

          {viewType !== 'songs' && (
            <p
              className='add-song'
              onClick={() => {
                dispatch(addSongToLibrary(token, song.track.id))
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
        (songs) && // !fetchSongsPending && !fetchPlaylistSongsPending) &&
        renderSongsTable()
      }
    </div>
  )
}

export default SongList
