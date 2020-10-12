import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { songs, sound, token, user } from './features'
import reducer from './reducers'

export const setupStore = () => configureStore({
    reducer: {
      ...reducer,
      songs,
      sound,
      token,
      user,
    },
    middleware: [...getDefaultMiddleware({ immutableCheck: false })]
  })
