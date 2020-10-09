// @ts-nocheck
import React from 'react'
import clsx from 'clsx'
import { createUseStyles, useTheme } from 'react-jss'

const useStyles = createUseStyles((theme) => ({
  overline: {
    fontSize: '11px',
    fontFamily: theme.typography.family.thin,
    letterSpacing: '1px',
    textTransform: 'uppercase',
  }
}))

type Props = {
  children: React.ReactNode,
  className?: string,
}

export const Overline = ({ children, className }: Props) => {
  const theme = useTheme()
  const classes = useStyles({ theme })

  return (
    <p className={clsx(
      classes.overline,
      className && `${className}`
    )}>
      {children}
    </p>
  )
}
