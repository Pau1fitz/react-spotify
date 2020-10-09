// @ts-nocheck
import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

const useStyles = createUseStyles(() => ({
  contentList: {
    display: 'grid',
    gridTemplateColumns: `repeat(6, 1fr)`,
    gridGap: '20px',
    margin: 0,
    padding: 0,
  },
}))

const ContentList = ({ columns, children }) => {
  const classes = useStyles(columns)

  console.log('ContentList', columns)
  
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
