import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ThemeProvider } from 'theming'

import { SpotifyDark } from '../../theme'

const TestProvider = ({
  store,
  children
}) => <Provider store={store}>{children}</Provider>

export function testRender(ui, { store, ...otherOpts }) {
  return render(
    <TestProvider store={store}>
      <ThemeProvider theme={SpotifyDark}>
        {ui}
      </ThemeProvider>
    </TestProvider>,
    otherOpts
  )
}

export function makeDispatchStore(config = {}) {
  const middlewares = config.middlewares ?? []
  const mockStore = configureStore(middlewares)

  const store = mockStore(config)
  const origDispatch = store.dispatch
  store.dispatch = jest.fn(origDispatch)
  return store
}
