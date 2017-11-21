import UserPlaylists from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPlaylists } from '../../actions/playlistActions';

const mapStateToProps = (state) => {

  return {
    playlists: state.playlistReducer.playlists ? state.playlistReducer.playlists : '',
  }

};

const mapDispatchToProps = (dispatch) => {

	return bindActionCreators({
    fetchPlaylists
  }, dispatch);

};
export default connect(mapStateToProps)(UserPlaylists);
