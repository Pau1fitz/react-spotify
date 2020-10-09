import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

import { Button, Icon } from '../../atoms'

const useStyles = createUseStyles({
  trackSearch: {
    alignItems: 'center',
    display: 'flex',

    '& input': {
      background: '#FFFFFF',
      border: 'none',
      borderRadius: '10px',
      outline: 'none',
      padding: '4px 4px 4px 10px',
      width: '120px',
    },

    '& button': {
      background: 'none',
      border: 'none',
      outline: 'none',

      '& .searchIcon': {
        color: 'white',
        cursor: 'pointer',
        fontSize: '15px',
        marginLeft: '5px',
      },  
    }
  }
})

const TrackSearch = ({ searchSongs, token }) => {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState('')

  const updateSearchTerm = (event) => setSearchTerm(event.target.value)

  return (
    <div className={classes.trackSearch}>
      <form onSubmit={() => searchSongs(searchTerm, token)}>
        <input
          onChange={updateSearchTerm}
          placeholder='Search'
          type='text'
        />

        <Button
          onClickAction={(e) => {
            e.preventDefault()
            searchSongs(searchTerm, token)
          }}
        >
          <Icon name='search' className='searchIcon' />
        </Button>
      </form>
    </div>
  )
}

TrackSearch.propTypes = {
  searchSongs: PropTypes.func,
  token: PropTypes.string
}

export default TrackSearch
