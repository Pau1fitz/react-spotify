import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BrowseView from './BrowseView'
import {
  fetchPlaylistSongs,
  addPlaylistItem
} from '../../../actions/playlistActions'
import { updateHeaderTitle } from '../../../actions/uiActions'

const mapStateToProps = ({ browseReducer, songs, token }) => {
  return {
    view: browseReducer.view,
    viewType: songs.viewType,
    token: token.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchPlaylistSongs,
      updateHeaderTitle,
      addPlaylistItem
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseView)
