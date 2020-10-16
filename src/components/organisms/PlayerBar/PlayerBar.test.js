import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'theming'

import PlayerBar from './'
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
        <PlayerBar songDetails={config} />
      </ThemeProvider>
    </Provider>
  )
}

test('PlayerBar displays expected elements', async () => {
  renderComponent(defaultConfig)

  expect(screen.queryByTestId(/play-info/i)).toBeInTheDocument()
  expect(screen.queryByTestId(/play-controls/i)).toBeInTheDocument()
  expect(screen.queryByTestId(/volume-controls/i)).toBeInTheDocument()
})
