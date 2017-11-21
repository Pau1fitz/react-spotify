export const userReducer = (state = {}, action) => {

	switch (action.type) {
		case "FETCH_PLAYLIST_SUCCESS":
			return {
				user: action.playlist,
        fetchPlaylistError: false,
				...state
			};

		case "FETCH_PLAYLIST_ERROR":
      return {
        fetchPlaylistError: true,
        ...state
      };

		default:
			return state;
	}

};

export default userReducer;
