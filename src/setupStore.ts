import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { player, songs, token, user } from './features'
import reducer from './reducers'

export const setupStore = () => configureStore({
    reducer: {
      ...reducer,
      player,
      songs,
      token,
      user,
    },
    middleware: [...getDefaultMiddleware({ immutableCheck: false })]
  })
