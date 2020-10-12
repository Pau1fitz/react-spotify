import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  volume: 100,
}

const soundSlice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    updateVolume(state, action) {
      state.volume = action.payload
    },
  },
})

export const { updateVolume } = soundSlice.actions
export default soundSlice.reducer
