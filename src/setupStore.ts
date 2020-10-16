import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { player, playlists, songs, token, ui, user } from './features'
import reducer from './reducers'

export const setupStore = () => configureStore({
    reducer: {
      ...reducer,
      player,
      playlists,
      songs,
      token,
      ui,
      user,
    },
    middleware: [...getDefaultMiddleware({ immutableCheck: false })]
  })
