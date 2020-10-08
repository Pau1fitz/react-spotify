import { Artwork } from './Artwork'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    albumImage: state.songsReducer.songDetails
      ? state.songsReducer.songDetails.album.images[0].url
      : ''
  }
}

export default connect(mapStateToProps)(Artwork)
