// reducers take the current state, perform the action & return the new state
// they listen for actions and update the state based on how their functions are defined
// "how to do it"

import playlistTypeReducer from "./playlistType";
import titleReducer from "./title";
import authorReducer from "./author";
import characterReducer from "./character";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  // nameOfState: valueReturnedByReducer
  playlistType: playlistTypeReducer,
  title: titleReducer,
  author: authorReducer,
  character: characterReducer,
});

export default rootReducer;
