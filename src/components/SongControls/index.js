import SongControls from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  playSong,
  stopSong,
  increaseSongTime
} from '../../actions/songActions';


const mapStateToProps = (state) => {

  return {
    songName: state.songsReducer.songDetails ? state.songsReducer.songDetails.name : '',
    artistName: state.songsReducer.songDetails ? state.songsReducer.songDetails.artists[0].name : '',
    songPlaying: state.songsReducer.songPlaying,
    timeElapsed: state.songsReducer.timeElapsed
  }

};

const mapDispatchToProps = (dispatch) => {

	return bindActionCreators({
    playSong,
    stopSong,
    increaseSongTime
  }, dispatch);

};
export default connect(mapStateToProps, mapDispatchToProps)(SongControls);
