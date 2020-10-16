import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'theming'

import VolumeControls from './'
import { songDetails1 } from '../../../constants'
import { SpotifyDark } from '../../../theme'

const initialState = {
  player: {
    trackId: '6MhR8bYMatTqRoFdFnyqr0',
    trackDetails: songDetails1,
    volume: 50,
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
    <Provider store={config.store}>
      <ThemeProvider theme={SpotifyDark}>
        <VolumeControls songDetails={config} />
      </ThemeProvider>
    </Provider>
  )
}

test('VolumeControls displays expected elements', async () => {
  renderComponent(defaultConfig)

  expect(screen.queryByLabelText(/Mute playback/i)).toBeInTheDocument()
  expect(screen.queryByLabelText(/Adjust playback volume/i)).toBeInTheDocument()
})

test('VolumeControls mute toggle functions as expected', async () => {
  renderComponent(defaultConfig)

  userEvent.click(screen.queryByLabelText(/Mute playback/i))
  await screen.findByLabelText(/Unmute playback/i)

  userEvent.click(screen.queryByLabelText(/Unmute playback/i))
  await screen.findByLabelText(/Mute playback/i)
})
