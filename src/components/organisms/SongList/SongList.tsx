// @ts-nocheck
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createUseStyles, useTheme } from 'react-jss'
import clsx from 'clsx'
import moment from 'moment'
import key from 'weak-key'

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

import { Icon } from '../../atoms'

const useStyles = createUseStyles((theme) => ({
  flatList: {
    display: 'flex',
    flexFlow: 'column',
    fontSize: '13px',
    listStyleType: 'none',

    '& .listRow': {
      display: 'grid',
      gridTemplateColumns: '70px 5fr 3fr',

      '&:hover': {
        background: theme.palette.grey[6],

        '& .playbackIcon': {
          color: theme.palette.white.secondary,
          display: 'block',
        },
      },

      '& li': {
        borderBottom: `1px solid ${theme.palette.grey[6]}`,
        listStyleType: 'none',
        overflow: 'hidden',
        padding: '14px 8px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },

      '& .actions': {
        position: 'relative',
        textAlign: 'right',

        '& .playbackIcon': {
          display: 'none',
          fontSize: '30px',
          left: '6px',
          position: 'absolute',
          top: '5px',

          '&:hover': {
            color: theme.palette.white.primary,
          }
        }
      },

      '& .time': {
        paddingRight: '8px',
        textAlign: 'right',
      },
    },

    '& .listHeader': {
      color: theme.palette.grey[1],
      fontSize: '10px',
      letterSpacing: '2px',
      textTransform: 'uppercase',

      '&.listRow': {
        '&:hover': {
          background: 'none',
        },

        '& li': {
          alignSelf: 'center',
          lineHeight: '16px',
          padding: '8px',
        },
      },
    },

    '& .album': {
      display: 'none',
    },
    '& .calendar': {
      display: 'none',
    },
    '& .time': {
      display: 'none',
    },
  },

  '@media (min-width: 840px)': {
    flatList: {
      '& .listRow': {
        gridTemplateColumns: '70px 5fr 3fr 2fr',
      },
      '& .calendar': {
        display: 'block',
      }
    }
  },
  '@media (min-width: 980px)': {
    flatList: {
      '& .listRow': {
        gridTemplateColumns: '70px 5fr 3fr 3fr 2fr',
      },
      '& .album': {
        display: 'block',
      }
    }
  },
  '@media (min-width: 1100px)': {
    flatList: {
      '& .listRow': {
        gridTemplateColumns: '70px 5fr 3fr 3fr 1fr 1fr',
      },
      '& .time': {
        display: 'block',
      }
    }
  }
}))

const SongList = ({ audioControl, resumeSong, pauseSong }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles({ theme })

  const songAddedId = useSelector(state => state.user.songId)
  const viewType = useSelector(state => state.songs.viewType)
  const token = useSelector(state => state.token.token)
  const songs = useSelector(state => state.songs.songs)

  const { trackId: currentTrackId, trackPaused } = useSelector(state => state.player)

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

  const handlePlaybackButton = (song) => {
    if (song.track.id !== currentTrackId) {
      dispatch(resetPlayback())
      audioControl(song)
    }
    else if (!!currentTrackId && trackPaused) {
      resumeSong()
    }
    else if (!!currentTrackId && !trackPaused) {
      pauseSong()
    }
  }

  const listHeaderStyles = clsx('listRow', 'listHeader')
  const listBodyRowStyles = (trackId) => clsx(
    'listRow',
    currentTrackId === trackId && 'active'
  )
  const playbackButtonIcon = (trackId) => currentTrackId === trackId && !trackPaused
    ? 'pause-circle'
    : 'play-circle'
  const addSongToLibraryButton = (songAddedId, trackId) => (
    <div
      className='add-song'
      onClick={() => {
        dispatch(addSongToLibrary(trackId))
      }}
    >
      <Icon name={songAddedId === trackId ? 'check' : 'plus'} />
    </div>
  )
  const addCheckIcon = () => (
    <div className='add-song'>
      <Icon name='check' className='icon' />
    </div>
  )

  return (
    <div className={classes.songList}>
      <div class={classes.flatList}>
        <ul className={listHeaderStyles}>
          <li>&nbsp;</li>
          <li>Title</li>
          <li>Artist</li>
          <li className='album'>Album</li>
          <li className='calendar'>
            <Icon name='calendar-alt' className='icon' />
          </li>
          <li className='time'><Icon iconSet='far' name='clock' className='icon' /></li>
        </ul>

        {
          songs && // !fetchSongsPending && !fetchPlaylistSongsPending) &&
          songs.map((song) => (
            <ul
              className={listBodyRowStyles(song.track.id)}
              key={key(song)}
            >
              <li className='actions'>
                <div onClick={() => handlePlaybackButton(song)}>
                  <Icon iconSet='far' name={playbackButtonIcon(song.track.id)} className='icon playbackIcon' />
                </div>

                {
                  viewType !== 'songs'
                    ? addSongToLibraryButton(songAddedId, song.track.id)
                    : addCheckIcon()
                }
              </li>
              <li>{song.track.name}</li>
              <li>{song.track.artists[0].name}</li>
              <li className='album'>{song.track.album.name}</li>
              <li className='calendar'>{moment(song.added_at).format('YYYY-MM-DD')}</li>
              <li className='time'>{msToMinutesAndSeconds(song.track.duration_ms)}</li>
            </ul>
          ))
        }
      </div>
    </div>
  )
}

export default SongList
