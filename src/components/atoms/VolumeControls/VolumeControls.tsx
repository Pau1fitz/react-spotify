import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

import { Icon } from '../'

const useStyles = createUseStyles({
  volumeControls: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',

    '& .volume': {
      background: '#1DB954',
      borderRadius: '4px',
      height: '5px',
      outline: 'none',
      opacity: '1',
      width: '120px',
      '-webkit-appearance': 'none',

      '&:hover': {
        background: '#1DB954',
        opacity: '0.8',
      },
      '&::-moz-range-track': {
        background: '#4CAF50',
        borderRadius: '4px',
        height: '5px',
        opacity: '1',
        outline: 'none',
        width: '120px',
      },
      '&::-webkit-slider-thumb': {
        appearance: 'none',
        background: '#FFFFFF',
        borderRadius: '50%',
        cursor: 'pointer',
        height: '12px',
        width: '12px',
        '-webkit-appearance': 'none',
      },
    },

    '& .icon': {
      marginRight: '5px',
    },
  }
})

export const VolumeControls = ({
  updateVolume,
  volume,
}) => {
  const classes = useStyles()
  const [volumeState, setVolumeState] = useState(volume)

  const handleVolumeChange = (event) => {
    setVolumeState(event.target.value)
    updateVolume(Math.ceil(event.target.value / 10) * 10)
  }

  return (
    <div className={classes.volumeControls}>
      <Icon name='volume-up' className='icon' />
      <input
        className='volume'
        type='range'
        min={0}
        max={100}
        value={volumeState}
        onChange={handleVolumeChange}
      />
    </div>
  )
}

VolumeControls.propTypes = {
  updateVolume: PropTypes.func,
  volume: PropTypes.number,
}
