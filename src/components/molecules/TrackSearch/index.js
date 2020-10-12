import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TrackSearch from './TrackSearch'
import { searchSongs } from '../../../features/songsSlice'

const mapStateToProps = (state) => ({
  token: state.token.token
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    searchSongs,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch)
