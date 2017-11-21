export const fetchPlaylistSuccess = (playlist) => {
  return {
    type: 'FETCH_PLAYLIST_SUCCESS',
    playlist
  }
}

export const fetchPlaylistError = () => {
  return {
    type: 'FETCH_PLAYLIST_ERROR'
  }
}

export const fetchPlaylists = (userId, accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    	headers: new Headers({
    	 'Authorization': 'Bearer ' + accessToken
      })
    });

    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      console.log(res)
      dispatch(fetchPlaylistSuccess(res));
    }).catch(err => {
      dispatch(fetchPlaylistError());
    });
  }
}
