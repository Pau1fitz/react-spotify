import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'theming'

import PlayInfo from './'
import { songDetails1, songDetails2 } from '../../../constants/test'
import { SpotifyDark } from '../../../theme'

const renderComponent = (config = null) => {
  return render(
    <ThemeProvider theme={SpotifyDark}>
      <PlayInfo trackDetails={config} />
    </ThemeProvider>
  )
}

describe('PlayInfo displays expected content', () => {
  test('when no content is available', async () => {
    renderComponent()
  
    expect(screen.queryByTestId('song-name')).not.toBeInTheDocument()
    expect(screen.queryByTestId('artist-name')).not.toBeInTheDocument()
  })

  test('when short content is presented', async () => {
    renderComponent(songDetails1)

    expect(screen.getByTestId('song-name')).toHaveTextContent('Words Remain')
    expect(screen.getByTestId('artist-name')).toHaveTextContent('Moderator')

    const artwork = screen.getByTestId('artwork')
    expect(artwork).toHaveAttribute('alt', 'Words Remain - Moderator')
    expect(artwork).toHaveAttribute('src', 'https://i.scdn.co/image/ab67616d0000485131073ba528a43985280d4dc6')
  })

  test('when long content is presented', async () => {
    renderComponent(songDetails2)
  
    expect(screen.getByTestId('song-name')).toHaveTextContent('Sonata No. 2 in A Major, Op. 2 No. 2: I. Allegro vivace')
    expect(screen.getByTestId('artist-name')).toHaveTextContent('Ludwig van Beethoven, Paul Lewis')

    const artwork = screen.getByTestId('artwork')
    expect(artwork).toHaveAttribute('alt', 'Sonata No. 2 in A Major, Op. 2 No. 2: I. Allegro vivace - Ludwig van Beethoven, Paul Lewis')
    expect(artwork).toHaveAttribute('src', 'https://i.scdn.co/image/ab67616d000048515fbde95caaf1018f9af50f71')
  })
})
