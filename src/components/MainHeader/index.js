import MainHeader from "./component";
import { connect } from "react-redux";
import { fetchCategories } from '../../actions/browseActions';
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {

  return {
    songPaused: state.songsReducer.songPaused,
    headerTitle: state.uiReducer.title,
    viewType: state.songsReducer.viewType,
    playlists: state.playlistReducer.playlists,
    token: state.tokenReducer.token
  }

};

const mapDispatchToProps = (dispatch) => {

	return bindActionCreators({
    fetchCategories
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
