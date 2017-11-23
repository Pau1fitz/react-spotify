import AlbumList from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchSongs,
  playSong,
  stopSong
 } from '../../actions/songActions';

const mapStateToProps = (state) => {

  return {
    token: state.tokenReducer.token ? state.tokenReducer.token : '',
    artists: state.artistsReducer.artistList ? state.artistsReducer.artistList.artists : '',
    fetchSongsError: state.songsReducer.fetchSongsError,
    fetchSongsPending: state.songsReducer.fetchSongsPending,
    songPlaying: state.songsReducer.songPlaying,
    songId: state.songsReducer.songId
  }

};

const mapDispatchToProps = (dispatch) => {

	return bindActionCreators({
    fetchSongs,
    playSong,
    stopSong
  }, dispatch);

};
export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
