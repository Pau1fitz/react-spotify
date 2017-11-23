import MainHeader from "./component";
import { connect } from "react-redux";

const mapStateToProps = (state) => {

  return {
    songPaused: state.songsReducer.songPaused,
    headerTitle: state.uiReducer.title,
    viewType: state.songsReducer.viewType,
    playlists: state.playlistReducer.playlists
  }

};

export default connect(mapStateToProps)(MainHeader);
