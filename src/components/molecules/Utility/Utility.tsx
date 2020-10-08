import React from 'react'
import { createUseStyles } from 'react-jss'

import { TrackSearch, UserDetails } from '../../molecules'

const useStyles = createUseStyles({
  utility: {
    position: 'relative',
    width: 'inherit',

    '& .layout': {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
    }
  }
})

const Utility = () => {
  const classes = useStyles()

  return (
    <div className={classes.utility}>
      <div className='layout'>
        <TrackSearch />
        <UserDetails />
      </div>
    </div>
  )
}

export default Utility
