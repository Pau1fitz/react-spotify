import { combineReducers } from "redux";
import userReducer from './userReducer';
import tokenReducer from './tokenReducer';
import playlistReducer from './playlistReducer';

export default combineReducers({
	userReducer,
  tokenReducer,
	playlistReducer
});
