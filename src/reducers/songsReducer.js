export const songsReducer = (state = {}, action) => {

	switch (action.type) {

  case "FETCH_SONGS_PENDING":
			return {
				...state,
				fetchSongsPending: true
			}

		case "FETCH_SONGS_SUCCESS":
			return {
				songs: action.songs,
        fetchSongsError: false,
				fetchSongsPending: false,
				...state
			};

		case "FETCH_SONGS_ERROR":
      return {
        fetchSongsError: true,
				fetchPSongsPending: false,
        ...state
      };

		default:
			return state;
	}

};

export default songsReducer;
