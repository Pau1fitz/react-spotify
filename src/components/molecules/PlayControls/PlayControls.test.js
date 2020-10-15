import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { ThemeProvider } from 'theming'

import PlayControls from './'
import { songDetails1 } from '../../../constants/test'
import { SpotifyDark } from '../../../theme'

const mockAudioControl = jest.fn();
const mockPauseSong = jest.fn();
const mockResumeSong = jest.fn();

const defaultConfig = {
  songs: {
    ...songDetails1,
    fetchSongsPending: true,
    songs: [],
    songId: 0,
    songPaused: true,
    songPlaying: false,
    timeElapsed: 0,
    viewType: 'songs',
  }
}

const renderComponent = (config = defaultConfig) => {
  const mockStore = configureStore([]);

  const store = mockStore({
    ...config
  })

  return render(
    <ThemeProvider theme={SpotifyDark}>
      <Provider store={store}>
        <PlayControls
          audioControl={mockAudioControl}
          pauseSong={mockPauseSong}
          resumeSong={mockResumeSong}
        />
      </Provider>
    </ThemeProvider>
  )
}

describe('PlayControls displays expected content', () => {
  test('when inactive', async () => {
    renderComponent()

    expect(screen.queryByLabelText('Go to Previous track')).toBeInTheDocument()
    expect(screen.queryByLabelText('Play/Pause playback')).toBeInTheDocument()
    expect(screen.queryByLabelText('Go to Next track')).toBeInTheDocument()
  })

  test('when active', async () => {
    renderComponent(songDetails1)
  
    expect(screen.getByTestId('song-name')).toHaveTextContent('Words Remain')
    expect(screen.getByTestId('artist-name')).toHaveTextContent('Moderator')

    const artwork = screen.getByTestId('artwork')
    expect(artwork).toHaveAttribute('alt', 'Words Remain - Moderator')
    expect(artwork).toHaveAttribute('src', 'https://i.scdn.co/image/ab67616d0000485131073ba528a43985280d4dc6')
  })
})
