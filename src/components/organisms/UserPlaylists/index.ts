import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import UserPlaylists from './UserPlaylists'
import { fetchPlaylistsMenu, fetchPlaylistSongs } from '../../../actions/playlistActions'
import { updateHeaderTitle } from '../../../actions/uiActions'

const mapStateToProps = (state) => {
	return {
		userId: state.userReducer.user ? state.userReducer.user.id : '',
		playlistMenu: state.playlistReducer.playlistMenu ? state.playlistReducer.playlistMenu : '',
		token: state.tokenReducer.token ? state.tokenReducer.token : '',
		title: state.uiReducer.title
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		fetchPlaylistsMenu,
		fetchPlaylistSongs,
		updateHeaderTitle
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylists)
