export const songsReducer = (state = {
	fetchSongsPending: true,
	songPlaying: false,
	timeElapsed: 0,
	songId: 0,
	viewType:'songs',
	songPaused: true
}, action) => {

	switch (action.type) {

	case "UPDATE_VIEW_TYPE":
		return {
			...state,
			viewType: action.viewType
		}

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
			fetchSongsPending: false,
			viewType: 'songs'
		};

	case "FETCH_SONGS_ERROR":
    return {
      ...state,
      fetchSongsError: true,
			fetchSongsPending: false
    };

	case "FETCH_RECENTLY_PLAYED_PENDING":
			return {
				...state,
				fetchRecentlyPlayedPending: true
			}

	case "FETCH_RECENTLY_PLAYED_SUCCESS":
		return {
			...state,
			songs: action.songs,
      fetchRecentlyPlayedError: false,
			fetchRecentlyPlayedPending: false
		};

	case "FETCH_RECENTLY_PLAYED_ERROR":
    return {
      ...state,
      fetchRecentlyPlayedError: true,
			fetchRecentlyPlayedPending: false
    };

	case "FETCH_PLAYLIST_SONGS_PENDING":
			return {
				...state,
				fetchPlaylistSongsPending: true
			}

	case "FETCH_PLAYLIST_SONGS_SUCCESS":
		return {
			...state,
			songs: action.songs,
			viewType: 'playlist',
			fetchPlaylistSongsError: false,
			fetchPlaylistSongsPending: false
		};

	case "FETCH_PLAYLIST_SONGS_ERROR":
		return {
			...state,
			fetchPlaylistError: true,
			fetchPlaylistSongsPending: false
		};

	case "PLAY_SONG":
			return {
				...state,
				songPlaying: true,
				songDetails: action.song,
				songId: action.song.id,
				timeElapsed: 0,
				songPaused: false
			}

	case "STOP_SONG":
			return {
				...state,
				songPlaying: false,
				songDetails: null,
				timeElapsed: 0,
				songPaused: true
			}

	case "PAUSE_SONG":
			return {
				...state,
				songPaused: true
			}

	case "RESUME_SONG":
			return {
				...state,
				songPaused: false
			}

	case "INCREASE_SONG_TIME":
		return {
			...state,
			timeElapsed: action.time
		}

	default:
		return state;
	}

};

export default songsReducer;
