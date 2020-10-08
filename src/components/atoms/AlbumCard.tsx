import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'
import key from 'weak-key'

import { Icon } from './'

const useStyles = createUseStyles({
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
      '& img': {
        maxHeight: '100%',
        objectFit: 'cover',
        width: '100%',
      },

      '& .playIcon': {
        fontSize: '50px',
        left: 'calc(50% - 15px)',
        position: 'absolute',
        top: 'calc(50% - 15px)',
      },  
    },

    '& .albumDetails': {
      fontSize: '13px',
      fontWeight: 'bold',
      lineHeight: '20px',
      padding: '10px 0',
    },
    '& .subText': {
      color: '#B2B2B2',
      fontWeight: 'normal',
    },
  }
})

export const AlbumCard = ({ song, audioControl }) => {
  const classes = useStyles()

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
