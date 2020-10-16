import { connect } from 'react-redux'

import BrowseView from './BrowseView'

const mapStateToProps = ({ browseReducer, songs, token }) => {
  return {
    view: browseReducer.view,
    viewType: songs.viewType,
    token: token.token,
  }
}

export default connect(mapStateToProps)(BrowseView)
