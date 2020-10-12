import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SongList from './SongList'
import { fetchSongs } from '../../../features/songsSlice'
import { addSongToLibrary } from '../../../actions/userActions'

const mapStateToProps = (state) => ({
  token: state.token.token ? state.token.token : '',
  songs: state.songs.songs ? state.songs.songs : '',
  fetchSongsError: state.songs.fetchSongsError,
  fetchSongsPending: state.songs.fetchSongsPending,
  fetchPlaylistSongsPending: state.songs.fetchPlaylistSongsPending,
  songPlaying: state.songs.songPlaying,
  songPaused: state.songs.songPaused,
  songId: state.songs.songId,
  songAddedId: state.userReducer.songId || '',
  viewType: state.songs.viewType,
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchSongs,
    addSongToLibrary
  }, dispatch)

}
export default connect(mapStateToProps, mapDispatchToProps)(SongList)
