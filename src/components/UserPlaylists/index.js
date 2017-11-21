import UserPlaylists from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchPlaylists,
  fetchPlaylistSongs
} from '../../actions/playlistActions';


const mapStateToProps = (state) => {

  return {
    userId: state.userReducer.user ? state.userReducer.user.id : '',
    playlists: state.playlistReducer.playlists ? state.playlistReducer.playlists : '',
    token: state.tokenReducer.token ? state.tokenReducer.token : ''
  }

};

const mapDispatchToProps = (dispatch) => {

	return bindActionCreators({
    fetchPlaylists,
    fetchPlaylistSongs
  }, dispatch);

};
export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylists);
