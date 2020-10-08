import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  button: {
    background: '#1db954',
    border: '4px solid transparent',
    borderRadius: '20px',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontSize: '10px',
    letterSpacing: '1px',
    outline: 'none',
    padding: '5px 30px',

    '&:hover': {
      background: '#2FD566',
      border: '4px solid #2FD566',
    },
  }
})

export const Button = ({ onClickAction, children }) => {
  const classes = useStyles()

  return (
    <button
      onClick={() => onClickAction()}
      className={classes.button}
    >
      {children}
    </button>
  )
}
