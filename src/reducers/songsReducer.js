export const songsReducer = (state = {}, action) => {

	switch (action.type) {

  case "FETCH_SONGS_PENDING":
			return {
				...state,
				fetchSongsPending: true
			}

		case "FETCH_SONGS_SUCCESS":
			return {
				...state,
				songs: action.songs,
        fetchSongsError: false,
				fetchSongsPending: false
			};

		case "FETCH_SONGS_ERROR":
      return {
        ...state,
        fetchSongsError: true,
				fetchPSongsPending: false
      };

	case "FETCH_PLAYLIST_SONGS_PENDING":
			return {
				...state,
				fetchSongsPending: true
			}

		case "FETCH_PLAYLIST_SONGS_SUCCESS":
			return {
				...state,
				songs: action.songs,
				fetchSongsError: false,
				fetchSongsPending: false
			};

		case "FETCH_PLAYLIST_SONGS_ERROR":
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
