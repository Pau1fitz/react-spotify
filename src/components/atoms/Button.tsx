// @ts-nocheck
import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles((theme) => ({
  button: {
    background: theme.palette.primary.main,
    border: '4px solid transparent',
    borderRadius: theme.borderRadius.large,
    color: theme.palette.white.primary,
    cursor: 'pointer',
    fontSize: '10px',
    letterSpacing: '1px',
    outline: 'none',
    padding: '5px 30px',

    '&:hover': {
      background: theme.palette.primary.dark,
      border: `4px solid ${theme.palette.primary.dark}`,
    },
  }
}))

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
