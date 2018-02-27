const defaultState = {
  artistIds: ''
};

export const artistsReducer = (state = defaultState, action) => {

  switch (action.type) {

  case "SET_ARTIST_IDS":
    return {
      ...state,
      artistIds: action.artistIds
    };

  case "FETCH_ARTISTS_PENDING":
    return {
      ...state,
      fetchArtistsPending: true
    };

  case "FETCH_ARTISTS_SUCCESS":
    return {
      ...state,
      artistList: action.artists,
      fetchArtistsError: false,
      fetchArtistsPending: false
    };

  case "FETCH_ARTISTS_ERROR":
    return {
      ...state,
      fetchArtistsError: true,
      fetchArtistsPending: false
    };

  default:
    return state;
  }
};

export default artistsReducer;
