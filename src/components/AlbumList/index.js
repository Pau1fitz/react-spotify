import AlbumList from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { uniqBy } from 'lodash';
import { fetchSongs, playSong, stopSong } from '../../actions/songActions';

const mapStateToProps = (state) => {

	const albumSongs = state.songsReducer.songs ? uniqBy(state.songsReducer.songs, (item) => {
		return item.track.album.name;
	}) : '';

	return {
		token: state.tokenReducer.token ? state.tokenReducer.token : '',
		songs: albumSongs,
		fetchSongsError: state.songsReducer.fetchSongsError,
		fetchSongsPending: state.songsReducer.fetchSongsPending,
		songPlaying: state.songsReducer.songPlaying,
		songId: state.songsReducer.songId
	};

};

const mapDispatchToProps = (dispatch) => {

	return bindActionCreators({
		fetchSongs,
		playSong,
		stopSong
	}, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
