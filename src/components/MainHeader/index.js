import MainHeader from "./component";
import { connect } from "react-redux";

const mapStateToProps = (state) => {

  return {
    songPlaying: state.songsReducer.songPlaying,
    headerTitle: state.uiReducer.title,
    viewType: state.songsReducer.viewType,
    playlists: state.playlistReducer.playlists
  }

};

export default connect(mapStateToProps)(MainHeader);
