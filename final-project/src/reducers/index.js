import playlistTypeReducer from "./playlistType";
import titleReducer from "./title";
import authorReducer from "./author";
import characterReducer from "./character";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  playlistType: playlistTypeReducer,
  title: titleReducer,
  author: authorReducer,
  character: characterReducer,
});

export default rootReducer;
