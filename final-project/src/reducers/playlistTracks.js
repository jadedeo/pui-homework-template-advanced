const playlistTrackReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PLAYLIST_TRACKS":
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default playlistTrackReducer;
