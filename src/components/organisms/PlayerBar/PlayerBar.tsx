// @ts-nocheck
import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import PropTypes from 'prop-types'

import { PlayControls, PlayInfo, VolumeControls } from '../../molecules'

const useStyles = createUseStyles((theme) => ({
  player: {
    alignItems: 'center',
    background: theme.palette.black.tertiary,
    borderTop: `1px solid ${theme.palette.black.primary}`,
    boxSizing: 'border-box',
    display: 'flex',
    gap: '60px',
    gridArea: 'baseRow / secondaryCol / baseRow / 3',
    justifyContent: 'space-between',
    padding: '0 14px',
    width: '100%',

    '& .playInfo': {
      flex: '0 1 auto',
      maxWidth: '220px',
    },
    '& .playControls': {
      flex: '2 1 auto',
      justifyContent:'center',
    },
    '& .volumeControl': {
      flex: '0 1 auto',
      maxWidth: '220px',
    },
  },
}))

const PlayerBar = ({
  audioControl,
  pauseSong,
  songDetails,
  stopSong,
  resumeSong,
  updateVolume,
  volume,
}) => {
  const theme = useTheme()
  const classes = useStyles({ theme })
  
  return (
    <div className={classes.player}>
      <PlayInfo
        className='playInfo'
        songDetails={songDetails}
      />

      <PlayControls
        className='playControls'
        audioControl={audioControl}
        pauseSong={pauseSong}
        resumeSong={resumeSong}
        stopSong={stopSong}
      />

      <VolumeControls
        className='volumeControls'
        updateVolume={updateVolume}
        volume={volume}
      />
    </div>
  )
}

PlayerBar.propTypes = {
  audioControl: PropTypes.func,
  pauseSong: PropTypes.func,
  songDetails: PropTypes.object,
  stopSong: PropTypes.func,
  resumeSong: PropTypes.func,
  updateVolume: PropTypes.func,
  volume: PropTypes.number,
}

export default PlayerBar
