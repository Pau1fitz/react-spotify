// @ts-nocheck
import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'

import { Button, Overline } from '../atoms'

const useStyles = createUseStyles((theme) => ({
  playlistHeader: {
    alignItems: 'flex-end',
    display: 'flex',
    paddingTop: '16px',

    '& img': {
      marginRight: '20px',
      maxHeight: '200px',
      maxWidth: '200px',
      objectFit: 'cover',
      width: '100%',
    },
    '& .subTitle': {
      paddingBottom: '10px',
    },
    '& .playlistName': {
      fontSize: '40px',
      fontFamily: theme.typography.family.bold,
      letterSpacing: '1px',
    },
    '& .subText': {
      color: '#AAAAAA',
      fontSize: '13px',
      padding: '10px 0',

      '& em': {
        color: '#FFFFFF',
        fontStyle: 'normal',
      },
      '& strong': {
        fontSize: '20px',
      }
    },
  },
}))

const PlaylistHeader = ({ buttonAction, buttonLabel, currentPlaylist }) => {
  const theme = useTheme()
  const classes = useStyles({ theme })

  const getPlaylistImageUrl = (playlist) => 
    playlist.images[0] ? playlist.images[0].url : null

  return (
    <div className={classes.playlistHeader}>
      <img src={getPlaylistImageUrl(currentPlaylist)} />

      <div>
        <Overline className="subTitle">PLAYLIST</Overline>

        <h3 className='playlistName'>{currentPlaylist.name}</h3>
        <p className='subText'>Created by <em>{currentPlaylist.owner.display_name}</em> <strong>&#183;</strong> {currentPlaylist.tracks.total} songs</p>

        <Button onClickAction={buttonAction}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}

export default PlaylistHeader
