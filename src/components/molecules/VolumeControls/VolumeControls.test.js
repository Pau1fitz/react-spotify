import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import VolumeControls from './'
import { songDetails1 } from '../../../constants'
import { setVolume } from '../../../features/playerSlice'
import { testRender, makeDispatchStore } from '../../../utilities/test'

const defaultInitialState = {
  player: {
    trackId: '6MhR8bYMatTqRoFdFnyqr0',
    trackDetails: songDetails1,
    volume: 50,
  },
  songs: {
    song: songDetails1,
  }
}
const setupTestStore = (initialState = defaultInitialState) => {
  const store = makeDispatchStore(initialState)
  store.dispatch(setVolume(initialState.player.volume))
  return store
}

test('VolumeControls displays expected elements', async () => {
  const store = setupTestStore()
  testRender(
    <VolumeControls />,
    { store }
  )

  expect(screen.queryByLabelText(/Mute playback/i)).toBeInTheDocument()
  expect(screen.queryByLabelText(/Adjust playback volume/i)).toBeInTheDocument()
})

test('VolumeControls mute toggle functions as expected', async () => {
  const store = setupTestStore()
  testRender(
    <VolumeControls />,
    { store }
  )

  userEvent.click(screen.queryByLabelText(/Mute playback/i))
  await screen.findByLabelText(/Unmute playback/i)
  expect(store.dispatch).toHaveBeenCalledWith(setVolume(0))

  userEvent.click(screen.queryByLabelText(/Unmute playback/i))
  await screen.findByLabelText(/Mute playback/i)
  expect(store.dispatch).toHaveBeenCalledWith(setVolume(50))
})

test('VolumeControls unmute toggle doesnt toggle if volume is 0', async () => {
  const customState = {
    ...defaultInitialState,
    player: {
      volume: 0,
    },
  }
  const store = setupTestStore(customState)
  testRender(
    <VolumeControls />,
    { store }
  )

  store.dispatch.mockReset()
  userEvent.click(screen.queryByLabelText(/Unmute playback/i))
  expect(store.dispatch).not.toHaveBeenCalledWith(setVolume(0))
})
