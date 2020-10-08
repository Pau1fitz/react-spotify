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
    justifyContent: 'space-between',

    bottom: 0,
    height: '80px',
    left: 0,
    padding: '0 30px 0 20px',
    position: 'fixed',
    width: '100%',
    zIndex: 2,
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
