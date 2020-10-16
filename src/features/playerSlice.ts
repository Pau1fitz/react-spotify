// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playbackTime: 0,
  trackId: null,
  trackDetails: false,
  trackPaused: false,
  volume: 5,
}

const playerStoreSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    pausePlayback: (state) => {
      state.trackPaused = true
    },
    resumePlayback: (state) => {
      state.trackPaused = false
    },
    startPlayback: (state, action) => {
      state.trackDetails = action.payload
      state.trackId = action.payload.id
      state.trackPaused = false
    },
    resetPlayback: (state) => {
      state = {
        ...initialState,
      }
    },
    setVolume(state, action) {
      state.volume = action.payload
    },
  }
})

export const {
  pausePlayback,
  resetPlayback,
  resumePlayback,
  startPlayback,
  setVolume,
} = playerStoreSlice.actions

export default playerStoreSlice.reducer
