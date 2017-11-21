export const fetchSongsPending = () => {
  return {
    type: 'FETCH_SONGS_PENDING'
  }
};

export const fetchSongsSuccess = (songs) => {
  return {
    type: 'FETCH_SONGS_SUCCESS',
    songs
  }
};

export const fetchSongsError = () => {
  return {
    type: 'FETCH_SONGS_ERROR'
  }
};

export const fetchSongs = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/me/tracks?limit=50`, {
    	headers: new Headers({
    	 'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchSongsPending());

    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      dispatch(fetchSongsSuccess(res.items));
    }).catch(err => {
      dispatch(fetchSongsError());
    });
  }
};

export const playSong = (song) => {
  return {
    type: 'PLAY_SONG',
    song
  }
};

export const stopSong = () => {
  return {
    type: 'STOP_SONG'
  }
};
