const titleReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_TITLE":
      return action.payload !== undefined ? action.payload : state;
    default:
      return state;
  }
};
export default titleReducer;
