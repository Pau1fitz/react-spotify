import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'theming'

import PlayControls from './'
import { songDetails1 } from '../../../constants/test'
import { SpotifyDark } from '../../../theme'

const mockAudioControl = jest.fn();
const mockPauseSong = jest.fn();
const mockResumeSong = jest.fn();

const initialState = {
  player: {
    trackId: '6MhR8bYMatTqRoFdFnyqr0',
    trackDetails: songDetails1,
  },
  songs: {
    song: songDetails1,
  }
}
const middlewares = []
const mockStore = configureStore(middlewares)
const store = mockStore(initialState)
const defaultConfig = { store }

const renderComponent = (config = null) => {
  return render(
    <ThemeProvider theme={SpotifyDark}>
      <Provider store={config.store}>
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
    renderComponent(defaultConfig)

    expect(screen.queryByLabelText('Go to Previous track')).toBeInTheDocument()
    expect(screen.queryByLabelText('Play/Pause playback')).toBeInTheDocument()
    expect(screen.queryByLabelText('Go to Next track')).toBeInTheDocument()
  })
})
