import { combineReducers } from "redux";
import userReducer from './userReducer';
import tokenReducer from './tokenReducer';
import playlistReducer from './playlistReducer';
import songsReducer from './songsReducer';
import albumsReducer from './albumsReducer';
import artistsReducer from './artistsReducer';
import uiReducer from './uiReducer';
import browseReducer from './browseReducer';
import soundReducer from './soundReducer';

export default combineReducers({
  userReducer,
  tokenReducer,
  playlistReducer,
  songsReducer,
  albumsReducer,
  artistsReducer,
  uiReducer,
  browseReducer,
  soundReducer
});
