import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TrackSearch from './TrackSearch'
import { searchSongs } from '../../../actions/songActions'

const mapStateToProps = (state) => {
  return {
    token: state.tokenReducer.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    searchSongs,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch)
