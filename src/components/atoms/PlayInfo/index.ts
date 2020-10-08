import { connect } from 'react-redux'

import { PlayInfo } from './PlayInfo'

const mapStateToProps = (state) => {
  return {
    albumImageUrl: state.songsReducer.songDetails
      ? state.songsReducer.songDetails.album.images[0].url
      : '',
    songName: state.songsReducer.songDetails
      ? state.songsReducer.songDetails.name
      : '',
    artistName: state.songsReducer.songDetails
      ? state.songsReducer.songDetails.artists[0].name
      : '',
  }
}

export default connect(mapStateToProps)(PlayInfo)
