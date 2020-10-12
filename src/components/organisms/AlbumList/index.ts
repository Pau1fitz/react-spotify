import { connect } from 'react-redux'
import uniqBy from 'lodash/uniqBy'

import AlbumList from './AlbumList'

const mapStateToProps = ({ songs }) => {
  const albumSongs = songs.songs
    ? uniqBy(songs.songs, item => item.track.album.name)
    : ''

  return {
    songs: albumSongs
  }
}

export default connect(mapStateToProps)(AlbumList)
