export const fetchPlaylistPending = () => {
  return {
    type: 'FETCH_PLAYLIST_PENDING'
  }
};

export const fetchPlaylistSuccess = (playlists) => {
  return {
    type: 'FETCH_PLAYLIST_SUCCESS',
    playlists
  }
};

export const fetchPlaylistError = () => {
  return {
    type: 'FETCH_PLAYLIST_ERROR'
  }
};

export const fetchPlaylists = (userId, accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    	headers: new Headers({
    	 'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchPlaylistPending());

    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      dispatch(fetchPlaylistSuccess(res.items));
    }).catch(err => {
      dispatch(fetchPlaylistError());
    });
  }
};
