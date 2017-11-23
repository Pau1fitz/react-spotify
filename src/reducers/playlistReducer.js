export const playlistReducer = (state = {}, action) => {

	switch (action.type) {

		case "FETCH_PLAYLIST_PENDING":
			return {
				fetchPlaylistPending: true,
				...state
			}

		case "FETCH_PLAYLIST_SUCCESS":
			return {
				playlists: action.playlists,
        fetchPlaylistError: false,
				fetchPlaylistPending: false,
				...state
			};

		case "FETCH_PLAYLIST_ERROR":
      return {
        fetchPlaylistError: true,
				fetchPlaylistPending: false,
        ...state
      };

		default:
			return state;
	}

};

export default playlistReducer;
