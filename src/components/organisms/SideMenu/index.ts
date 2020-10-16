import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SideMenu from './SideMenu'
import { fetchSongs, fetchRecentlyPlayed, updateViewType } from '../../../features/songsSlice'

import { fetchAlbums } from '../../../actions/albumActions'
import { fetchArtists } from '../../../actions/artistActions'
import { fetchFeatured } from '../../../actions/browseActions'

const mapStateToProps = ({ artistsReducer, token, user }) => {
  return {
    artistIds: artistsReducer.artistIds,
    token: token.token ? token.token : '',
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
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
