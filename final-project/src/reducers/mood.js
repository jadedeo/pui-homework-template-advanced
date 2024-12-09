const moodReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MOOD":
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default moodReducer;
