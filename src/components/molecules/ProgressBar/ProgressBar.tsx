// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import clsx from 'clsx'
import moment from 'moment'

const useStyles = createUseStyles((theme) => ({
  progressBar: {
    alignItems: 'center',
    display: 'flex',
    height: '14px',
    listStyleType: 'none',
    justifyContent: 'center',
    width: '100%',

    '& .bar': {
      alignItems: 'center',
      display: 'flex',
      width: '100%',
    },

    '& .time': {
      fontSize: '12px',
      textAlign: 'left',
      width: '40px',

      '&:first-of-type': {
        textAlign: 'right',
      },

      '&.inactive': {
        visibility: 'hidden',
      },
    },

    '& .progess': {
      appearance: 'none',
      background: theme.palette.grey[4],
      border: 'none',
      borderRadius: theme.borderRadius.tiny,
      height: '3px',
      margin: '0 10px',
      width: '100%',
      '-moz-appearance': 'none',
      '-webkit-appearance': 'none',

      '&::-moz-progress-bar': {
        background: theme.palette.grey[2],
        borderRadius: theme.borderRadius.tiny,
        transition: 'width 1s linear',
      },
      '&::-webkit-progress-value': {
        background: theme.palette.grey[2],
        borderRadius: theme.borderRadius.tiny,
        transition: 'width 1s linear',
      }
    }
  }
}))

export const ProgressBar = ({ trackId, isPaused, trackLengthMs }) => {
  const theme = useTheme()
  const classes = useStyles({ theme })

  const savedCallback = useRef()
  const [trackTimer, setTrackTimer] = useState(0)
  const [currentTrackId, setCurrentTrackId] = useState(trackId)
  const [trackElapsedTimeMs, setTrackElapsedTimeMs] = useState(0)

  function playbackTimer() {
    if (
      isPaused ||
      trackElapsedTimeMs >= trackLengthMs
    ) {
      clearInterval(trackTimer)
    } else {
      setTrackElapsedTimeMs(trackElapsedTimeMs + 100)
    }
  }
  function tick() {
    savedCallback.current()
  }
  function clearExistingTimer() {
    if (trackTimer) {
      clearInterval(trackTimer)
    }
  }

  useEffect(() => {
    if (currentTrackId !== trackId) {
      setTrackElapsedTimeMs(0)
      setCurrentTrackId(trackId)
    }
  }, [currentTrackId, trackId])

  useEffect(() => {
    savedCallback.current = playbackTimer
  })

  useEffect(() => {
    const isTrackResumed = !!trackId && !isPaused && (currentTrackId === trackId)
    if (isTrackResumed) {
      clearExistingTimer()
      setTrackTimer(setInterval(tick, 100))
    }
  }, [currentTrackId, isPaused, trackId])

  useEffect(() => {
    const isNewTrack = !!trackId && currentTrackId !== trackId
    if (isNewTrack) {
      clearExistingTimer()
      setTrackTimer(setInterval(tick, 100))
    }
  }, [currentTrackId, trackId])

  const formattedTime = (ms) => moment().minutes(0).seconds(ms/1000).format('m:ss')
  const timeStyles = clsx(
    'time',
    !trackId && 'inactive'
  )

  return (
    <ul className={classes.progressBar}>
      <li className={timeStyles}>
        {formattedTime(trackElapsedTimeMs)}
      </li>

      <li className='bar'>
        <progress
          className='progess'
          min='0'
          max={trackLengthMs}
          value={trackElapsedTimeMs}
        />
      </li>

      <li className={timeStyles}>
        {formattedTime(trackLengthMs)}
      </li>
    </ul>
  )
}
