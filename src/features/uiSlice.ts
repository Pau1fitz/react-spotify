import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'SpotifyDark',
  title: '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setHeaderTitle: (state, action) => {
      state.title = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const { setHeaderTitle, setTheme } = uiSlice.actions
export default uiSlice.reducer

