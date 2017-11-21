import SongPlayer from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  playSong,
  stopSong
} from '../../actions/songActions';


const mapStateToProps = (state) => {

  return {
    songName: state.songsReducer.songDetails ? state.songsReducer.songDetails.name : '',
    artistName: state.songsReducer.songDetails ? state.songsReducer.songDetails.artists[0].name : ''
  }

};

const mapDispatchToProps = (dispatch) => {

	return bindActionCreators({
    playSong,
    stopSong
  }, dispatch);

};
export default connect(mapStateToProps, mapDispatchToProps)(SongPlayer);
