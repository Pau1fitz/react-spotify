import BrowseView from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchPlaylistSongs,
  addPlaylistItem
} from "../../actions/playlistActions";
import { updateHeaderTitle } from "../../actions/uiActions";

const mapStateToProps = state => {
  return {
    view: state.browseReducer.view,
    viewType: state.songsReducer.viewType,
    token: state.tokenReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchPlaylistSongs,
      updateHeaderTitle,
      addPlaylistItem
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseView);
