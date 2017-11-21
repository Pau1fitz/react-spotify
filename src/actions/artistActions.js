export const fetchArtistsPending = () => {
  return {
    type: 'FETCH_ARTISTS_PENDING'
  }
};

export const fetchArtistsSuccess = (artists) => {

  console.log(artists)
  return {
    type: 'FETCH_ARTISTS_SUCCESS',
    artists
  }
};

export const fetchArtistsError = () => {
  return {
    type: 'FETCH_ARTISTS_ERROR'
  }
};

export const fetchArtists = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/me/following?type=artist`, {
    	headers: new Headers({
    	 'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchArtistsPending());

    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      dispatch(fetchArtistsSuccess(res));
    }).catch(err => {
      dispatch(fetchArtistsError());
    });
  }
};
