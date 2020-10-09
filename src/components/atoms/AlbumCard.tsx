// @ts-nocheck
import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import PropTypes from 'prop-types'
import key from 'weak-key'

import { Icon } from './'

const useStyles = createUseStyles((theme) => ({
  albumCard: {
    cursor: 'pointer',
    display: 'block',
    fontSize: '14px',
    listStyleType: 'none',
    padding: '0',
    position: 'relative',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    '& .albumCover': {
      position: 'relative',

      '& img': {
        maxHeight: '100%',
        objectFit: 'cover',
        width: '100%',
      },

      '& .playIcon': {
        fontSize: '60px',
        left: 'calc(50% - 30px)',
        position: 'absolute',
        top: 'calc(50% - 30px)',
      },  
    },

    '& .albumDetails': {
      fontFamily: theme.typography.family.bold,
      fontSize: '13px',
      letterSpacing: '0.5px',
      lineHeight: '20px',
      padding: '10px 0',

      '& > *': {
        margin: 0,
      }
    },
    '& .subText': {
      color: theme.palette.grey[1],
      fontFamily: theme.typography.family.normal,
    },
  }
}))

export const AlbumCard = ({ song, audioControl }) => {
  const theme = useTheme()
  const classes = useStyles({ theme })

  return (
    <li
      className={classes.albumCard}
      key={key(song)}
      onClick={() => {
        audioControl(song)
      }}
    >
      <div className='albumCover'>
        <img
          alt={song.track.album.name}
          src={song.track.album.images[0].url}
        />
        <Icon name='play-circle-o' className='playIcon' />
      </div>

      <div className='albumDetails'>
        <p>{song.track.album.name}</p>
        <p className='subText'>{song.track.album.artists[0].name}</p>
      </div>
    </li>
  )
}

AlbumCard.propTypes = {
  song: PropTypes.any,
  audioControl: PropTypes.func
}
