import { connect } from 'react-redux'
import uniqBy from 'lodash/uniqBy'

import AlbumList from './AlbumList'

const mapStateToProps = state => {
  const albumSongs = state.songsReducer.songs
    ? uniqBy(state.songsReducer.songs, item => item.track.album.name)
    : ''

  return {
    songs: albumSongs
  }
}

export default connect(mapStateToProps)(AlbumList)
