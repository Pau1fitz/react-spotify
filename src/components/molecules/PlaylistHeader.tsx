import React from 'react'
import { createUseStyles } from 'react-jss'

import { Button, Overline } from '../atoms'

const useStyles = createUseStyles({
  playlistHeader: {
    alignItems: 'flex-end',
    display: 'flex',
    height: '160px',

    '& .playlistImage': {
      backgroundColor: '#FFFFFF',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '100%',
      marginRight: '20px',
      maxHeight: '160px',
      maxWidth: '160px',
      width: '100%',
    },
    '& .subTitle': {
      paddingBottom: '10px',
    },
    '& .playlistName': {
      fontSize: '40px',
      fontFamily: "'Proxima Bold', Georgia, sans-serif",
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
    },
  },
})

const PlaylistHeader = ({ buttonAction, buttonLabel, currentPlaylist }) => {
  const classes = useStyles()

  const getPlaylistImageUrl = (playlist) => 
    playlist.images[0] ? playlist.images[0].url : null

  return (
    <div className={classes.playlistHeader}>
      <div className='playlistImage' style={{ backgroundImage: `url(${getPlaylistImageUrl(currentPlaylist)})` }}></div>

      <div>
        <Overline className="subTitle">PLAYLIST</Overline>

        <h3 className='playlistName'>{currentPlaylist.name}</h3>
        <p className='subText'>Created By: <em>{currentPlaylist.owner.display_name}</em> - {currentPlaylist.tracks.total} songs</p>

        <Button onClickAction={buttonAction}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}

export default PlaylistHeader
