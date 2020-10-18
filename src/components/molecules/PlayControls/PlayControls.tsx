// @ts-nocheck
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createUseStyles, useTheme } from 'react-jss'
import clsx from 'clsx'

import { startPlayback } from '../../../features/playerSlice'

import { Icon } from '../../atoms'
import { ProgressBar } from '../'

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
    marginBottom: '6px',

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
        fontSize: '14px',
      },
      '&.large .far': {
        fontSize: '36px',
      },
      '&.redo .fas': {
        transform: 'rotate(135deg)',
      }
    },
  },
}))

// TODO: add random playback function
// TODO: add loop playback function
// TODO: add full track playback

const PlayControls = ({
  audioControl,
  pauseSong,
  resumeSong,
  className,
}) => {
  const theme = useTheme()
  const classes = useStyles({ theme })
  const dispatch = useDispatch()

  const songs = useSelector(state => state.songs.songs)
  const { trackId, trackDetails, trackPaused } = useSelector(state => state.player)

  const getCurrentSongIndex = () =>
    songs.map((song, index) =>
      (song.track === trackDetails) ? index : undefined
    )
    .filter(item => item !== undefined)[0]

  const handleRandomPlayback = () => null
  const handleNextSong = () => {
    let currentIndex = getCurrentSongIndex()
    currentIndex === songs.length - 1 ? audioControl(songs[0]) : audioControl(songs[currentIndex + 1])
  }
  const handlePlayPauseSong = () => !trackPaused ? pauseSong() : resumeSong()
  const handlePrevSong = () => {
    let currentIndex = getCurrentSongIndex()
    currentIndex === 0 ? audioControl(songs[songs.length - 1]) : audioControl(songs[currentIndex - 1])
  }
  const handleLoopPlayback = () => null

  const cueNextTrack = () => {
    if (getCurrentSongIndex() < songs.length - 1) {
      dispatch(startPlayback(songs[currentIndex + 1]))
      audioControl(songs[currentIndex + 1])
    }
  }

  const playbackButtonIcon = trackPaused ? 'play-circle' : 'pause-circle'
  const playControlStyles = clsx(
    classes.playControls,
    className && `${className}`
  )

  return (
    <div className={playControlStyles} data-testid='play-controls'>
      <ul className={classes.controls}>
        <li onClick={handleRandomPlayback} className='icon small'>
          <Icon name='random' className='disabled' />
        </li>
        <li onClick={handlePrevSong} className='icon small' aria-label='Go to Previous track'>
          <Icon name='step-backward' />
        </li>
        <li onClick={handlePlayPauseSong} className='icon large' aria-label='Play/Pause playback'>
          <Icon name={`${playbackButtonIcon}`} iconSet='far' />
        </li>
        <li onClick={handleNextSong} className='icon small' aria-label='Go to Next track'>
          <Icon name='step-forward' />
        </li>
        <li onClick={handleLoopPlayback} className='icon small redo'>
          <Icon name='redo' className='disabled' />
        </li>
      </ul>

      <ProgressBar
        cueNextTrack={cueNextTrack}
        isPaused={trackPaused}
        trackId={trackId}
        trackLengthMs={30000}
      />
    </div>
  )
}

export default PlayControls
