const spotifyUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SPOTIFY_USER":
      return action.payload !== undefined ? action.payload : state;
    default:
      return state;
  }
};
export default spotifyUserReducer;
