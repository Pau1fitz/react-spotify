import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

const useStyles = createUseStyles({
  userDetails: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px 0',

    '& img': {
      borderRadius: '50%',
      height: '30px',
    },

    '& .name': {
      color: '#FFFFFF',
      fontSize: '14px',
      marginLeft: '10px',
      position: 'relative',
      top: '5px',
    },
  }
})

const UserDetails = ({ userImageUrl, displayName }) => {
  const classes = useStyles()
  
  return (
    <div className={classes.userDetails}>
      <img alt="user details" src={userImageUrl} />
      <p className="name">{displayName}</p>
    </div>
  )
}

UserDetails.propTypes = {
  userImageUrl: PropTypes.string,
  displayName: PropTypes.string
}

export default UserDetails
