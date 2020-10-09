import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

import { PlayControls, PlayInfo, VolumeControls } from '../atoms'

const useStyles = createUseStyles({
  player: {
    alignItems: 'center',
    background: '#282828',
    borderTop: '1px solid #181818',
    boxSizing: 'border-box',
    display: 'flex',
    gridArea: 'baseRow / secondaryCol / baseRow / 3',
    justifyContent: 'space-between',
    padding: '0 20px',
  },
})

const Player = ({ audioControl, pauseSong, stopSong, resumeSong }) => {
  const classes = useStyles()
  
  return (
    <div className={classes.player}>
      <PlayInfo />

      <PlayControls
        stopSong={stopSong}
        pauseSong={pauseSong}
        resumeSong={resumeSong}
        audioControl={audioControl}
      />
      <VolumeControls />
    </div>
  )
}

Player.propTypes = {
  audioControl: PropTypes.func,
  pauseSong: PropTypes.func,
  stopSong: PropTypes.func,
  resumeSong: PropTypes.func,
}

export default Player
