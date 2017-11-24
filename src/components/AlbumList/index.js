import AlbumList from "./component";
import { connect } from "react-redux";
import { uniqBy } from 'lodash';

const mapStateToProps = (state) => {

	const albumSongs = state.songsReducer.songs ? uniqBy(state.songsReducer.songs, (item) => {
		return item.track.album.name;
	}) : '';

	return {
		songs: albumSongs
	};

};

export default connect(mapStateToProps)(AlbumList);
