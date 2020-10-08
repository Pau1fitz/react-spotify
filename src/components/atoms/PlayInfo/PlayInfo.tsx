import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

const useStyles = createUseStyles({
  playInfo: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    minWidth: '144px',
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '& img': {
      height: '52px',
      marginRight: '14px',
    },
  
    '& .songName': {
      fontSize: '13px',
    },
    '& .artistName': {
      color: '#B2B2B2',
      fontSize: '12px',
    },
  },
})

export const PlayInfo = ({
  albumImageUrl,
  artistName,
  songName,
}) => {
  const classes = useStyles()
  const hasSong = artistName && songName

  return (
    <div className={classes.playInfo}>
      {
        hasSong &&
        <>
          <img src={albumImageUrl} alt={`${artistName} - ${songName}`} />

          <div>
            <p className='songName'>{songName}</p>
            <p className='artistName'>{artistName}</p>
          </div>
        </>
      }
    </div>
  )
}

PlayInfo.propTypes = {
  albumImageUrl: PropTypes.string, 
  artistName: PropTypes.string,
  songName: PropTypes.string,
}
