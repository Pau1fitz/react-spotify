import SongPlayer from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


const mapStateToProps = (state) => {

  return {
    albumArtwork: state.songsReducer.songDetails ? state.songsReducer.songDetails.album.images[0].url : ''
  }

};

export default connect(mapStateToProps)(SongPlayer);
