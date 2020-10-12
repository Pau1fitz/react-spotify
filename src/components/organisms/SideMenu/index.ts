import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SideMenu from './SideMenu'
import { fetchSongs, fetchRecentlyPlayed, updateViewType } from '../../../features/songsSlice'

import { fetchAlbums } from '../../../actions/albumActions'
import { fetchArtists } from '../../../actions/artistActions'
import { fetchFeatured } from '../../../actions/browseActions'
import { updateHeaderTitle } from '../../../actions/uiActions'

const mapStateToProps = ({ artistsReducer, token, uiReducer, user }) => {
  return {
    artistIds: artistsReducer.artistIds,
    token: token.token ? token.token : '',
    title: uiReducer.title,
    userId: user.user ? user.user.id : '',
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchRecentlyPlayed,
    fetchSongs,
    fetchAlbums,
    fetchArtists,
    fetchFeatured,
    updateViewType,
    updateHeaderTitle,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
