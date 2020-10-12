// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Icon } from '../../atoms'

const useStyles = createUseStyles((theme) => ({
  playControls: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
  },

  controls: {
    alignItems: 'center',
    display: 'flex',
    listStyleType: 'none',
    justifyContent: 'center',
    marginBottom: '10px',

    '& > *': {
      margin: '0 6px',
    },

    '& .icon': {
      color: theme.palette.white.secondary,
      cursor: 'default',
      padding: '0 5px',

      '&:hover': {
        color: theme.palette.white.primary,
      },

      '&.small .fas': {
        fontSize: '16px',
      },
      '&.large .far': {
        fontSize: '36px',
      },
      '&.redo .fas': {
        transform: 'rotate(135deg)',
      }
    },
  },

  progress: {
    alignItems: 'center',
    display: 'flex',
    height: '14px',
    justifyContent: 'center',
    width: '100%',

    '& .time': {
      fontSize: '12px',

      '&.inactive': {
        display: 'none',
      },
    },

    '& .track': {
      background: theme.palette.grey[4],
      borderRadius: theme.borderRadius.small,
      height: '4px',
      margin: '0 10px',
      maxWidth: '500px',
      minWidth: '200px',
      width: '100%',
    },
    '& .progress': {
      background: theme.palette.grey[2],
      borderRadius: theme.borderRadius.small,
      height: '4px',
      margin: 0,
      width: 0,
    }
  }
}))

// TODO: add random playback function
// TODO: add loop playback function

export const PlayControls = ({
  audioControl,
  className,
  increaseSongTime,
  pauseSong,
  resumeSong,
  songDetails,
  songPaused,
  songPlaying,
  songs,
  stopSong,
  timeElapsed,
}) => {
  const theme = useTheme()
  const classes = useStyles({ theme })

  const [songTime, setSongTime] = useState(timeElapsed)
  const [intervalId, setIntervalId] = useState(false)

  // console.log('PC', songPlaying, songPaused, timeElapsed, intervalId)

  useEffect(() => {
    const calculateTime = () => {
      // const interval = setInterval(() => {
      //   if (timeElapsed === 30) {
      //     clearInterval(intervalId)
      //     stopSong()
      //   } else if (!songPaused) {
      //     increaseSongTime(timeElapsed + 1)
      //   }
      // }, 1000)

      setIntervalId(
        setInterval(() => {

          // console.log('setTimeInterval')

          if (timeElapsed === 30) {
            clearInterval(intervalId)
            stopSong()
          } else if (!songPaused) {
            increaseSongTime(timeElapsed + 1)
          }
        }, 1000)
      )
    }

    // console.log('useEffect', songPlaying, timeElapsed)

    if (!songPlaying) {
      clearInterval(intervalId)
    }

    if (songPlaying && timeElapsed === 0) {
      clearInterval(intervalId)
      calculateTime()
    }

    setSongTime(timeElapsed)
  }, [songPlaying, timeElapsed])

  const getSongIndex = () =>
    songs.map((song, index) =>
      (song.track === songDetails) ? index : undefined
    )
    .filter(item => item !== undefined)[0]

  const handleRandomPlayback = () => console.log('TODO: add random playback function')
  const handleNextSong = () => {
    let currentIndex = getSongIndex()
    currentIndex === songs.length - 1 ? audioControl(songs[0]) : audioControl(songs[currentIndex + 1])
  }
  const handlePlayPauseSong = () => !songPaused ? pauseSong() : resumeSong()
  const handlePrevSong = () => {
    let currentIndex = getSongIndex()
    currentIndex === 0 ? audioControl(songs[songs.length - 1]) : audioControl(songs[currentIndex - 1])
  }
  const handleLoopPlayback = () => console.log('TODO: add loop playback function')

  const buttonPlayPauseIcon = songPaused ? 'play-circle' : 'pause-circle'
  const formattedTime = (time) => moment().minutes(0).second(time).format('m:ss')

  const playControlStyles = clsx(
    classes.playControls,
    className && `${className}`
  )
  const timeStyles = clsx(
    'time',
    songTime === 0 && 'inactive'
  )

  return (
    <div className={playControlStyles}>
      <ul className={classes.controls}>
        <li onClick={handleRandomPlayback} className='icon small'>
          <Icon name='random' className='disabled' />
        </li>
        <li onClick={handlePrevSong} className='icon small'>
          <Icon name='step-backward' />
        </li>
        <li onClick={handlePlayPauseSong} className='icon large'>
          <Icon name={`${buttonPlayPauseIcon}`} iconSet='far' />
        </li>
        <li onClick={handleNextSong} className='icon small'>
          <Icon name='step-forward' />
        </li>
        <li onClick={handleLoopPlayback} className='icon small redo'>
          <Icon name='redo' className='disabled' />
        </li>
      </ul>

      <div className={classes.progress}>
        <p className={timeStyles}>
          {formattedTime(songTime)}
        </p>
        <div className='track'>
          <div style={{ width: songTime * 16.5 }} className='progress' />
        </div>
        <p className={timeStyles}>
          {formattedTime(30 - songTime)}
        </p>
      </div>
    </div>
  )
}

PlayControls.propTypes = {
  artistName: PropTypes.string,
  audioControl: PropTypes.func,
  className: PropTypes.string,
  increaseSongTime: PropTypes.func,
  pauseSong: PropTypes.func,
  resumeSong: PropTypes.func,
  songDetails: PropTypes.object,
  songName: PropTypes.string,
  songPaused: PropTypes.bool,
  songPlaying: PropTypes.bool,
  songs: PropTypes.array,
  stopSong: PropTypes.func,
  timeElapsed: PropTypes.number,
}
