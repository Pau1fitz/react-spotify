// @ts-nocheck
import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'
import key from 'weak-key'

const useStyles = createUseStyles({
  browseView: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyleType: 'none',
    padding: '0',

    '& .item': {
      cursor: 'pointer',
      fontSize: '14px',
      listStyleType: 'none',
      lineHeight: '28px',
      overflow: 'hidden',
      padding: '10px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '200px',

      '& .image': {
        position: 'relative',

        '& img': {
          width: '100%',
        },
      },

      '& h5': {
        fontSize: '18px',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, 100%)',
      }
    },
  }
})


const BrowseView = ({ view, viewType, token, fetchPlaylistSongs, updateHeaderTitle, addPlaylistItem }) => {
  const classes = useStyles()

  const getPlaylistSongs = (item) => {
    addPlaylistItem(item)
    fetchPlaylistSongs(item.owner.id, item.id, token)
    updateHeaderTitle(item.name)
  }
  const getClickHandler = (type, item) => type === 'Featured' ? getPlaylistSongs(item) : null
  const getImageUrl = (item) => item.icons ? item.icons[0].url : item.images[0].url

  return (
    <ul className={classes.browseView}>
      {
        view &&
        view.map((item) => {
          return (
            <li className='item' onClick={() => getClickHandler(viewType, item)} key={key(item)}>
              <div className='image'>
                <img alt={item.name  || 'category'} src={getImageUrl(item)} />

                {viewType === 'Genres' && (
                  <h5>{item.name}</h5>
                )}
              </div>
            </li>
          )
          })
      }
    </ul>
  )
}


BrowseView.propTypes = {
  addPlaylistItem: PropTypes.func,
  fetchPlaylistSongs: PropTypes.func,
  token: PropTypes.string,
  updateHeaderTitle: PropTypes.func,
  view: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  viewType: PropTypes.string,
}

export default BrowseView
