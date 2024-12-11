const spotifyUserReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_SPOTIFY_USER":
      return action.payload !== undefined ? action.payload : state;
    case "RESET_SPOTIFY_USER":
      return null;
    default:
      return state;
  }
};

export default spotifyUserReducer;
