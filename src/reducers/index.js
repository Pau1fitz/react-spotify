import { combineReducers } from "redux";
import userReducer from './userReducer';
import tokenReducer from './tokenReducer';
import playlistReducer from './playlistReducer';
import songsReducer from './songsReducer';

export default combineReducers({
	userReducer,
  tokenReducer,
	playlistReducer,
	songsReducer
});
