// @ts-nocheck
import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import clsx from 'clsx'

interface IconProps {
  iconSet?: string,
  name: string,
  className?: string
}

const defaultProps: IconProps = {
  iconSet: 'fas',
  name: 'bug',
}

const useStyles = createUseStyles((theme) => ({
  Icon: {
    fontSize: '14px',

    '&.disabled': {
      color: `${theme.palette.grey[3]} !important`,
      cursor: 'not-allowed'
    }
  },
}))

export const Icon: React.FC<IconProps> = ({ iconSet, name, className }) => {
  const theme = useTheme()
  const classes = useStyles({ theme })

  const iconStyles = clsx(
    classes.Icon,
    iconSet,
    `fa-${name}`,
    className && `${className}`
  )
  return (<i className={iconStyles} aria-hidden='true' />)
}

Icon.defaultProps = defaultProps
