// @ts-nocheck
import React from 'react'
import { createUseStyles } from 'react-jss'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import key from 'weak-key'

import { addPlaylistItem, fetchPlaylistSongs } from './../../../features/playlistsSlice'
import { setHeaderTitle } from './../../../features/uiSlice'

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

const BrowseView = ({ view, viewType, token }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const getPlaylistSongs = (item) => {
    dispatch(addPlaylistItem(item))
    dispatch(fetchPlaylistSongs(token, item.owner.id, item.id))
    dispatch(setHeaderTitle(item.name))
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
  token: PropTypes.string,
  view: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  viewType: PropTypes.string,
}

export default BrowseView
