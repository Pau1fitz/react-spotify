import React from 'react'
import { createUseStyles } from 'react-jss'

import { TrackSearch, UserDetails } from '../../molecules'

const useStyles = createUseStyles({
  utility: {
    display: 'flex',
    flexFlow: 'row nowrap',
    gridArea: 'topRow1 / mainCol / topRow1 / mainCol',
    justifyContent: 'space-between',
    padding: '0 20px',
  }
})

const Utility = () => {
  const classes = useStyles()

  return (
    <div className={classes.utility}>
      <TrackSearch />
      <UserDetails />
    </div>
  )
}

export default Utility
