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
      state.trackId = action.payload.id
      state.trackDetails = action.payload
      state.trackPaused = false
    },
    resetPlayback: (state) => {
      state = {
        ...initialState,
      }
    },
    tickPlaybackTime: (state, action) => {
      state.playbackTime = action.payload
    },
    updateVolume(state, action) {
      state.volume = action.payload
    },
  }
})

export const {
  pausePlayback,
  resetPlayback,
  resumePlayback,
  startPlayback,
  tickPlaybackTime,
  updateVolume,
} = playerStoreSlice.actions

export default playerStoreSlice.reducer
