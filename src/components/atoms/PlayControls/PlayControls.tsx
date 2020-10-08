import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Icon } from '../'

const useStyles = createUseStyles({
  playControls: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
  },

  controls: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '4px',

    '& .button': {
      color: '#b3b3b3',
      cursor: 'pointer',
      padding: '0 5px',

      '&.small': {
        fontSize: '16px',
      },
      '&.large': {
        fontSize: '40px',
        '-webkit-text-stroke': '4px #282828',
      },
    },
  },

  progress: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',

    '& .time': {
      fontSize: '12px',

      '&.inactive': {
        display: 'none',
      },
    },

    '& .barBg': {
      background: '#404040',
      borderRadius: '4px',
      height: '4px',
      margin: '0 10px',
      width: '500px',
    },
    '& .bar': {
      background: '#1db954',
      borderRadius: '4px',
      height: '4px',
      margin: '0',
      width: '100px',
    }
  }
})

export const PlayControls = ({
  audioControl,
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
  const classes = useStyles()
  const [songTime, setSongTime] = useState(timeElapsed)
  const [intervalId, setIntervalId] = useState(false)

  // componentWillReceiveProps(nextProps) {
  //   const calculateTime = () => {
  //     const intervalId = setInterval(() => {
  //       if (this.state.timeElapsed === 30) {
  //         clearInterval(this.state.intervalId)
  //         stopSong()
  //       } else if (!songPaused) {
  //         increaseSongTime(this.state.timeElapsed + 1)
  //       }
  //     }, 1000)
  
  //     setIntervalId(intervalId)
  //   }

  //   if (!nextProps.songPlaying) {
  //     clearInterval(intervalId)
  //   }

  //   if (nextProps.songPlaying && nextProps.timeElapsed === 0) {
  //     clearInterval(intervalId)
  //     calculateTime()
  //   }

  //   setSongTime(nextProps.timeElapsed)
  // }

  const getSongIndex = () =>
    songs.map((song, index) =>
      (song.track === songDetails) ? index : undefined
    )
    .filter(item => item !== undefined)[0]

  const handlePlayPauseSong = () => !songPaused ? pauseSong : resumeSong
  const handleNextSong = () => {
    let currentIndex = getSongIndex()
    currentIndex === songs.length - 1 ? audioControl(songs[0]) : audioControl(songs[currentIndex + 1])
  }
  const handlePrevSong = () => {
    let currentIndex = getSongIndex()
    currentIndex === 0 ? audioControl(songs[songs.length - 1]) : audioControl(songs[currentIndex - 1])
  }

  const buttonPlayPauseIcon = songPaused ? 'play-circle-o' : 'pause-circle-o'
  const formattedTime = (time) => moment().minutes(0).second(time).format('m:ss')

  return (
    <div className={classes.playControls}>
      <div>
        <div className={classes.controls}>
          <a onClick={handlePrevSong} className='button small'>
            <Icon name='step-backward' />
          </a>

          <a onClick={handlePlayPauseSong} className='play-btn'>
            <Icon name={buttonPlayPauseIcon} className='button large' />
          </a>

          <a onClick={handleNextSong} className='button small'>
            <Icon name='step-forward' />
          </a>
        </div>

        <div className={classes.progress}>
          <p className={clsx('time', songTime === 0 && 'inactive')}>
            {formattedTime(songTime)}
          </p>
          <div className='barBg'>
            <div style={{ width: songTime * 16.5 }} className='bar' />
          </div>
          <p className={clsx('time', songTime === 0 && 'inactive')}>
            {formattedTime(30 - songTime)}
          </p>
        </div>
      </div>
    </div>
  )
}

PlayControls.propTypes = {
  artistName: PropTypes.string,
  audioControl: PropTypes.func,
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
