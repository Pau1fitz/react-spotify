// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit'
import uniqBy from 'lodash/uniqBy'

const initialState = {
  fetchPlaylistError: false,
  fetchPlaylistPending: false,
  playlists: [],
  menu: [],
}

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    addPlaylistItem: (state, action) => {
      state.playlists = [
        ...state.playlists,
        action.playlist
      ]
    },
    fetchPlaylistMenuPending: (state) => {
      state.fetchPlaylistPending = true
    },
    fetchPlaylistMenuSuccess: (state, action) => {
      state.fetchPlaylistError = false
      state.fetchPlaylistPending = false
      state.menu = action.playlists
      state.playlists = action.playlists
    },
    fetchPlaylistMenuError: (state) => {
      state.fetchPlaylistError = true
      state.fetchPlaylistPending = false
    }
  },
})

export const fetchPlaylistsMenu = (token, userId) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    })

    dispatch(fetchPlaylistMenuPending())

    fetch(request).then(res => {
      if(res.statusText === "Unauthorized") {
        window.location.href = './'
      }
      return res.json()
    }).then(res => {
      dispatch(fetchPlaylistMenuSuccess(res.items))
    }).catch(err => {
      dispatch(fetchPlaylistMenuError(err))
    })
  }
}

export const fetchPlaylistSongs = (token, userId, playlistId) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    })

    dispatch(fetchPlaylistSongsPending())

    fetch(request).then(res => {
      return res.json()
    }).then(res => {
      res.items = uniqBy(res.items, (item) => {
        return item.track.id
      })
      dispatch(fetchPlaylistSongsSuccess(res.items))
    }).catch(err => {
      dispatch(fetchPlaylistSongsError(err))
    })
  }
}

export const { addPlaylistItem } = playlistsSlice.actions
export default playlistsSlice.reducer
