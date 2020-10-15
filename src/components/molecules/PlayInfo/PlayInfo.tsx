// @ts-nocheck
import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import clsx from 'clsx'

import { Artwork } from '../../atoms'
import { imageSizes } from '../../../constants'

const useStyles = createUseStyles((theme) => ({
  playInfo: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',

    '&:after': {
      boxShadow: `inset -6px 0px 10px -3px ${theme.palette.black.tertiary}`,
      content: '""',
      display: 'block',
      height: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      width: '7px',
      zIndex: 1,
    },

    '& .artwork': {
      height: '52px',
      marginRight: '14px',
      width: '52px',
    },
  
    '& .name': {
      whiteSpace: 'pre',

      '&:hover': {
        cursor: 'pointer',
      },
      '&--song': {
        fontSize: '13px',
        paddingBottom: '6px',
        
      },
      '&--artist': {
        color: theme.palette.grey[1],
        fontSize: '12px',
      },  
    },
  },
}))


// TODO: add long name marquee
// TODO: add Artwork magnifier UI
// TODO: add Artwork link to currently playing main content
// TODO: add favorite track heart button

const PlayInfo = ({ className, trackDetails }) => {
  const theme = useTheme()
  const classes = useStyles({ theme })

  let artistNameString, songName
  const hasCurrentSong = !!trackDetails

  if (trackDetails) {
    songName = trackDetails.name
    artistNameString = trackDetails.artists.reduce((accum, artist) => accum += `${artist.name}, `, '').slice(0, -2)
  }

  const playInfoStyles = clsx(
    classes.playInfo,
    className && `${className}`
  )

  return (
    <div className={playInfoStyles} data-testid='play-info'>
      {
        hasCurrentSong &&
        <>
          <div className='artwork'>
            <Artwork
              size={imageSizes.SMALL}
              images={trackDetails.album.images}
              caption={`${songName} - ${artistNameString}`}
            />
          </div>

          <div>
            <p className='name name--song' data-testid='song-name'>
              <span>{songName}</span>
            </p>
            <p className='name name--artist' data-testid='artist-name'>
              <span>{artistNameString}</span>
            </p>
          </div>
        </>
      }
    </div>
  )
}

export default PlayInfo
