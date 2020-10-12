import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MainHeader from './MainHeader'
import {
  fetchCategories,
  fetchNewReleases,
  fetchFeatured
} from '../../../actions/browseActions'
import { updateHeaderTitle } from '../../../actions/uiActions'
import { updateViewType } from '../../../features/songsSlice'

const mapStateToProps = (state) => {
  return {
    songPaused: state.songs.songPaused,
    headerTitle: state.uiReducer.title,
    viewType: state.songs.viewType,
    playlists: state.playlistReducer.playlists,
    artists: state.artistsReducer.artistList
      ? state.artistsReducer.artistList.artists
      : [],
    token: state.token.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchCategories,
      fetchNewReleases,
      updateHeaderTitle,
      updateViewType,
      fetchFeatured
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader)
