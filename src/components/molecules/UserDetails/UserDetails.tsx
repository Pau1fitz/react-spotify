import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

const useStyles = createUseStyles({
  userDetails: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',

    '& img': {
      borderRadius: '50%',
      height: '30px',
    },

    '& .name': {
      color: '#FFFFFF', // theme.palette.white,
      fontSize: '14px',
      marginLeft: '10px',
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
  displayName: PropTypes.string,
  userImageUrl: PropTypes.string,
}

export default UserDetails
