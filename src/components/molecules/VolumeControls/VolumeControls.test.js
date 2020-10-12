import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'theming'

import VolumeControls from './'
import { SpotifyDark } from '../../../theme'

const renderComponent = (config = null) => {
  return render(
    <ThemeProvider theme={SpotifyDark}>
      <VolumeControls songDetails={config} />
    </ThemeProvider>
  )
}

test('VolumeControls displays expected elements', async () => {
  renderComponent()

  expect(screen.queryByLabelText(/Mute playback/i)).toBeInTheDocument()
  expect(screen.queryByLabelText(/Adjust playback volume/i)).toBeInTheDocument()
})

test('VolumeControls mute toggle functions as expected', async () => {
  renderComponent()

  userEvent.click(screen.queryByLabelText(/Mute playback/i))
  waitFor(() => screen.queryByLabelText(/Unmute playback/i))

  userEvent.click(screen.queryByLabelText(/Unmute playback/i))
  waitFor(() => screen.queryByLabelText(/Mute playback/i))
})
