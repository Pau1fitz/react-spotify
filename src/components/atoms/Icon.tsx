import React from 'react'
import clsx from 'clsx'

interface IconProps {
  name: string,
  className?: string
}

const defaultProps: IconProps = {
  name: 'bug'
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const iconStyles = clsx(
    'fa',
    `fa-${name}`,
    className && `${className}`
  )
  return (<i className={iconStyles} aria-hidden='true' />)
}

Icon.defaultProps = defaultProps
