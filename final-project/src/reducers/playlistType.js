const playlistTypeReducer = (state = "character", action) => {
  switch (action.type) {
    case "CHANGE_TYPE":
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default playlistTypeReducer;
