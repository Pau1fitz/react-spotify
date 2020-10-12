import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PlayerBar from './PlayerBar'
import { updateVolume } from '../../../features/soundSlice'
import { increaseSongTime } from '../../../features/songsSlice'

const mapStateToProps = ({ songs, sound }) => ({
  songDetails: songs.songDetails,
  volume: sound.volume,
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateVolume,
    increaseSongTime,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBar)
