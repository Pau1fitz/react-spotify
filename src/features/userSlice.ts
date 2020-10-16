import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: false,
  fetchUserError: false,
  songAddedToLibrary: false,
  songId: '',
  user: {
    images: [],
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addSongToLibraryError(state, action) {
      state.error = action.payload
      state.songAddedToLibrary = false
    },
    addSongToLibrarySuccess(state, action) {
      state.songAddedToLibrary = true
      state.songId = action.payload
    },
    fetchUserError(state, action) {
      state.error = action.payload
      state.fetchUserError = true
    },
    fetchUserSuccess(state, action) {
      state.fetchUserError = false
      state.user = action.payload
    },
  },
})

export const addSongToLibrary = (token, id) => {
  return (dispatch) => {
    const request = new Request(
      `https://api.spotify.com/v1/me/tracks?ids=${id}`,
      {
        method: 'PUT',
        headers: new Headers({
          Authorization: 'Bearer ' + token,
        }),
      }
    )

    fetch(request)
      .then((res) => {
        if (res.ok) {
          dispatch(addSongToLibrarySuccess(id))
        }
      })
      .catch((err) => {
        dispatch(addSongToLibraryError(err))
      })
  }
}

export const fetchUser = (token) => {
  return (dispatch) => {
    const request = new Request('https://api.spotify.com/v1/me', {
      headers: new Headers({
        Authorization: 'Bearer ' + token,
      }),
    })

    fetch(request)
      .then((res) => {
        if (res.statusText === 'Unauthorized') {
          window.location.href = './'
        }
        return res.json()
      })
      .then((res) => {
        dispatch(fetchUserSuccess(res))
      })
      .catch((err) => {
        dispatch(fetchUserError(err))
      })
  }
}

export const {
  addSongToLibraryError,
  addSongToLibrarySuccess,
  fetchUserError,
  fetchUserSuccess,
} = userSlice.actions
export default userSlice.reducer
