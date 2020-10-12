import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { PlayControls } from './PlayControls'
import { increaseSongTime } from '../../../features/songsSlice'

const mapStateToProps = (state) => {
  return {
    songName: state.songs.songDetails
      ? state.songs.songDetails.name
      : '',
    artistName: state.songs.songDetails
      ? state.songs.songDetails.artists[0].name
      : '',
    songPlaying: state.songs.songPlaying,
    timeElapsed: state.songs.timeElapsed,
    songPaused: state.songs.songPaused,
    songDetails: state.songs.songDetails,
    songs: state.songs.songs
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      increaseSongTime
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayControls)
