import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MainHeader from './MainHeader'
import {
  fetchCategories,
  fetchNewReleases,
  fetchFeatured
} from '../../../actions/browseActions'
import { updateViewType } from '../../../features/songsSlice'

const mapStateToProps = (state) => {
  return {
    artists: state.artistsReducer.artistList
      ? state.artistsReducer.artistList.artists
      : [],
    songPaused: state.songs.songPaused,
    token: state.token.token,
    viewType: state.songs.viewType,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchCategories,
      fetchFeatured,
      fetchNewReleases,
      updateViewType,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader)
