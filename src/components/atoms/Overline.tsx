import React from 'react'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  overline: {
    fontSize: '11px',
    fontFamily: '"Proxima Thin", sans-serif',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  }
})

type Props = {
  children: React.ReactNode,
  className?: string,
}

export const Overline = ({ children, className }: Props) => {
  const classes = useStyles()

  return (
    <p className={clsx(
      classes.overline,
      className && `${className}`
    )}>
      {children}
    </p>
  )
}
