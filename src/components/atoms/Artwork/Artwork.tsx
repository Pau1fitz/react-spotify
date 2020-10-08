import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

const useStyles = createUseStyles({
  albumArtwork: {
    bottom: '75px',
    position: 'fixed',
    width: '180px',

    '& img': {
      width: '100%',
    },
  },
})

export const Artwork = (albumArtwork) => {
  const classes = useStyles()

  return (
    <div className={classes.albumArtwork}>
      <img alt='artwork' src={albumArtwork.albumImage} />
    </div>
  )
}

Artwork.propTypes = {
  albumArtwork: PropTypes.string
}
