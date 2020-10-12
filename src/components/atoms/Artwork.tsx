import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

const useStyles = createUseStyles({
  artwork: {
    maxHeight: '100%',
    objectFit: 'cover',
  },
})

export const Artwork = ({ caption, images, size }) => {
  const classes = useStyles()

  const sizedImage = images.find((image) => image.width === size)

  return (
    <img
      src={sizedImage.url}
      alt={caption}
      className={classes.artwork}
      data-testid='artwork'
    />
  )
}

Artwork.propTypes = {
  caption: PropTypes.string,
  images: PropTypes.array,
  size: PropTypes.number,
}
