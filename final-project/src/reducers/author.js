const authorReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_AUTHOR":
      return action.payload !== undefined ? action.payload : state;
    default:
      return state;
  }
};
export default authorReducer;