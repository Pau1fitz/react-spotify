// @ts-nocheck
import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import PropTypes from 'prop-types'

const useStyles = createUseStyles((theme) => ({
  playInfo: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '200px',

    '& img': {
      height: '52px',
      marginRight: '14px',
    },
  
    '& .songName': {
      fontSize: '13px',
      paddingBottom: '6px',
    },
    '& .artistName': {
      color: theme.palette.grey[1],
      fontSize: '12px',
    },
  },
}))

export const PlayInfo = ({
  albumImageUrl,
  artistName,
  songName,
}) => {
  const theme = useTheme()
  const classes = useStyles({ theme })
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
