// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { Range, getTrackBackground } from 'react-range'
import PropTypes from 'prop-types'

import { Icon } from '../../atoms'

const useStyles = createUseStyles((theme) => ({
  volumeControls: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',

    '& .icon': {
      color: theme.palette.white.secondary,

      '&:hover': {
        color: theme.palette.white.primary,
      }
    },
  },

  muteToggle: {
    display: 'inline-flex',
    width: '14px',
  },

  range: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    height: '14px',
    padding: '20px 15px',
    position: 'relative',
    outline: 'none',
    width: '100px',

    '&:hover .range__thumb': {
      visibility: 'visible',
    },

    '& .range__track': {
      display: 'flex',
      width: '100%',

      '&--active': {
        alignSelf: 'center',
        borderRadius: '1px',
        height: '4px',
        width: '100%',
      },
    },
    '& .range__thumb': {
      alignItems: 'center',
      background: theme.palette.white.primary,
      borderRadius: '50%',
      cursor: 'default',
      display: 'flex',
      height: '12px',
      justifyContent: 'center',
      outline: 'none',
      width: '12px',
      visibility: 'hidden',

      '&--active': {
        background: `radial-gradient(circle at right bottom, ${theme.palette.white.primary} 25%, ${theme.palette.grey[2]} 100%)`,
        borderRadius: '50%',
        height: '8px',
        width: '8px',
        visibility: 'hidden',
      },
    },
  },

  fullscreenToggle: {
    '& .icon': {
      fontSize: '18px',
    },
  }
}))

// TODO: add Fullscreen toggle functionality
// TODO: add Queue icon/link

const VolumeControls = ({
  updateVolume,
  volume,
}) => {
  const theme = useTheme()
  const classes = useStyles({ theme })
  
  const [volumeState, setVolumeState] = useState(0)
  const [volumeEnabled, setVolumeEnabled] = useState(true)

  const rangeStep = 1
  const rangeMin = 0
  const rangeMax = 100
  const volumeIcon = volumeEnabled ? 'volume-up' : 'volume-mute'

  useEffect(() => {
    setVolumeState(volume)
  }, [])

  const handleVolumeToggle = () => {
    if (volumeEnabled) {
      setVolumeEnabled(false)
      setVolumeState(volume)
      updateVolume(0)
    } else {
      setVolumeEnabled(true)
      updateVolume(volumeState)
    }
  }
  const handleVolumeChange = (value) => {
    setVolumeState(value[0])
    updateVolume(value[0])
  }
  const handleFullscreenToggle = () => {
    console.log('TODO: add fullscreen toggle function')
  }

  return (
    <div className={classes.volumeControls}>
      <div
        className={classes.muteToggle}
        onClick={handleVolumeToggle}
        role='button'
        aria-label={volumeEnabled ? 'Mute playback' : 'Unmute playback' }
      >
        <Icon name={volumeIcon} className='icon' />
      </div>

      <div className={classes.range}>
        <Range
          values={[volume]}
          step={rangeStep}
          min={rangeMin}
          max={rangeMax}
          onChange={(values) => handleVolumeChange(values)}
          renderTrack={({ props, isDragged, children }) => (
            <div
              className='range__track'
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                cursor: 'default',
              }}
            >
              <div
                className='range__track--active'
                ref={props.ref}
                style={{
                  background: getTrackBackground({
                    values: [volume],
                    colors: [
                      isDragged ? theme.palette.primary.main : theme.palette.grey[1],
                      theme.palette.grey[4]
                    ],
                    min: rangeMin,
                    max: rangeMax,
                  }),
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className='range__thumb'
              style={{
                ...props.style,
                cursor: 'default',
              }}
              aria-label='Adjust playback volume'
              aria-valuemin={rangeMin}
              aria-valuemax={rangeMax}
              aria-valuenow={volume}
            >
              <div className='range__thumb--active' />
            </div>
          )}
        />
      </div>

      <div onClick={handleFullscreenToggle} className={classes.fullscreenToggle}>
        <Icon name='expand-alt' className='icon disabled' />
      </div>
    </div>
  )
}

VolumeControls.propTypes = {
  updateVolume: PropTypes.func,
  volume: PropTypes.number,
}

export default VolumeControls
