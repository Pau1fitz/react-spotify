// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit'
import uniqBy from 'lodash/uniqBy'
import { setArtistIds } from '../actions/artistActions'

const initialState = {
  fetchSongsPending: true,
  songId: 0,
  songPaused: true,
  songPlaying: false,
  timeElapsed: 0,
  viewType: 'songs',
}

const songsStoreSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchArtistSongsError: (state, _action) => {
      state.fetchArtistSongsError = true
      state.fetchArtistSongsPending = false
    },
    fetchArtistSongsPending: (state, _action) => {
      state.fetchArtistSongsPending = true
    },
    fetchArtistSongsSuccess: (state, action) => {
      state.fetchArtistSongsError = false
      state.fetchArtistSongsPending = false
      state.songs = action.payload
      state.viewType = 'Artist'
    },
    fetchPlaylistSongsError: (state, _action) => {
      state.fetchPlaylistSongsError = true
      state.fetchPlaylistSongsPending = false
    },
    fetchPlaylistSongsPending: (state, _action) => {
      state.fetchPlaylistSongsPending = true
    },
    fetchPlaylistSongsSuccess: (state, action) => {
      state.fetchPlaylistSongsError = false
      state.fetchPlaylistSongsPending = false
      state.songs = action.payload
      state.viewType = 'playlist'
    },
    fetchRecentlyPlayedError: (state, _action) => {
      state.fetchSongsError = true
      state.fetchSongsPending = false
    },
    fetchRecentlyPlayedPending: (state, _action) => {
      state.fetchSongsPending = true
    },
    fetchRecentlyPlayedSuccess: (state, action) => {
      state.fetchSongsError = false
      state.fetchSongsPending = false
      state.songs = action.payload
      state.viewType = 'Recently Played'
    },
    fetchSongsError: (state, _action) => {
      state.fetchSongsError = true
      state.fetchSongsPending = false
    },
    fetchSongsPending: (state, _action) => {
      state.fetchSongsPending = true
    },
    fetchSongsSuccess: (state, action) => {
      state.songs = action.payload
      state.fetchSongsError = false
      state.fetchSongsPending = false
      state.viewType = 'songs'
    },
    searchSongsError: (state, _action) => {
      state.searchSongsError = true
      state.searchSongsPending = false
    },
    searchSongsPending: (state, _action) => {
      state.searchSongsPending = true
    },
    searchSongsSuccess: (state, action) => {
      state.songs = action.payload
      state.searchSongsError = false
      state.searchSongsPending = false
      state.viewType = 'search'
    },

    increaseSongTime: (state, action) => { state.timeElapsed = action.payload },
    playSong: (state, action) => {
      state.songPlaying = true
      state.songDetails = action.song
      state.songId = action.song.id
      state.timeElapsed = 0
      state.songPaused = fals
    },
    pauseSong: (state, _action) => { state.songPaused = true },
    resumeSong: (state, _action) =>  { state.songPaused = false },
    stopSong: (state, _action) => {
      state.songDetails = null
      state.songPlaying = false
      state.songPaused = true
      state.timeElapsed = 0
    },

    updateViewType: (state, action) => { state.viewType = action.payload },
  }
})

export const fetchArtists = (accessToken, artistIds) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/artists?ids=${artistIds}`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    })

    dispatch(fetchArtistsPending())

    fetch(request).then(res => {
      return res.json()
    }).then(res => {
      dispatch(fetchArtistsSuccess(res))
    }).catch(err => {
      dispatch(fetchArtistsError(err))
    })
  }
}
export const fetchRecentlyPlayed = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/me/player/recently-played`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    })

    dispatch(fetchRecentlyPlayedPending())

    fetch(request).then(res => {
      return res.json()
    }).then(res => {
      //remove duplicates from recently played
      res.items = uniqBy(res.items, (item) => {
        return item.track.id
      })
      dispatch(fetchRecentlyPlayedSuccess(res.items))
    }).catch(err => {
      dispatch(fetchRecentlyPlayedError(err))
    })
  }
}
export const fetchSongs = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/me/tracks?limit=50`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    })

    dispatch(fetchSongsPending())

    fetch(request).then(res => {
      if (res.statusText === "Unauthorized") {
        window.location.href = './'
      }
      return res.json()
    }).then(res => {
      let artistIds = uniqBy(res.items, (item) => 
          item.track.artists[0].name
        )
        .map(item => item.track.artists[0].id)
        .join(',')

      dispatch(setArtistIds(artistIds))
      dispatch(fetchSongsSuccess(res.items))
    }).catch(err => {
      dispatch(fetchSongsError(err))
    })
  }
}
export const searchSongs = (accessToken, searchTerm) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json'
      })
    })

    dispatch(searchSongsPending())

    fetch(request).then(res => {
      if(res.statusText === "Unauthorized") {
        window.location.href = './'
      }
      return res.json()
    }).then(res => {
      res.items = res.tracks.items.map(item => {
        return {
          track: item
        }
      })
      dispatch(searchSongsSuccess(res.items))
    }).catch(err => {
      dispatch(fetchSongsError(err))
    })
  }
}

export const {
  fetchArtistSongsError,
  fetchArtistSongsPending,
  fetchArtistSongsSuccess,
  fetchPlaylistSongsError,
  fetchPlaylistSongsPending,
  fetchPlaylistSongsSuccess,
  fetchRecentlyPlayedError,
  fetchRecentlyPlayedPending,
  fetchRecentlyPlayedSuccess,
  fetchSongsError,
  fetchSongsPending,
  fetchSongsSuccess,
  searchSongsError,
  searchSongsPending,
  searchSongsSuccess,
  increaseSongTime,
  playSong,
  pauseSong,
  resumeSong,
  stopSong,
  updateViewType,
} = songsStoreSlice.actions

export default songsStoreSlice.reducer
