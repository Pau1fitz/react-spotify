import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'
import key from 'weak-key'

const useStyles = createUseStyles({
  artistList: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyleType: 'none',
    padding: 0,

    '& .artistBadge': {
      color: '#FFFFFF',
      cursor: 'pointer',
      fontSize: '14px',
      lineHeight: '28px',
      listStyleType: 'none',
      overflow: 'hidden',
      padding: '10px 20px 20px 0',
      textAlign: 'center',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '180px',

      '& img': {
        clipPath: 'circle(90px at center)',
        height: '180px',
        width: '180px',
      },

      '& .noArtistImage': {
        background: 'radial-gradient(circle, rgba(255,255,255,1) 5%, rgba(64,64,64,1) 100%)',
        borderRadius: '200px',
        display: 'inline-block',
        height: '180px',
        width: '180px',
      },
    },
  }
})

const ArtistList = ({
  artists,
  fetchArtistSongs,
  token,
  updateHeaderTitle
}) => {
  const classes = useStyles()

  const renderArtists = () =>
    artists.map((artist) => {
      const artistSongsAction = (artist, token) => {
        fetchArtistSongs(artist.id, token)
        updateHeaderTitle(artist.name)
      }

      return (
        <li
          className='artistBadge'
          onClick={() => {
            artistSongsAction(artist, token)
          }}
          key={key(artist)}
        >
          <div>
            {
              artist.images[0]
                ? <img alt={artist.name} src={artist.images[0].url} />
                : <i className='noArtistImage' />
            }

            <p className='name'>{artist.name}</p>
          </div>
        </li>
      )
    })

  return (
    <ul className={classes.artistList}>{artists && renderArtists()}</ul>
  )
}

ArtistList.propTypes = {
  artists: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchArtistSongs: PropTypes.func,
  token: PropTypes.string,
  updateHeaderTitle: PropTypes.func
}

export default ArtistList
