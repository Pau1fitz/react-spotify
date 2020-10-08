import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

const useStyles = createUseStyles({
  contentList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '20px',
    margin: 0,
    padding: 0,
  },
})

const ContentList = ({ children }) => {
  const classes = useStyles()
  
  return (
    <ul className={classes.contentList}>
      {children}
    </ul>
  )
}

ContentList.propTypes = {
  content: PropTypes.array,
}

export default ContentList
