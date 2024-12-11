const characterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_CHARACTER":
      return action.payload !== undefined ? action.payload : state;
    default:
      return state;
  }
};
export default characterReducer;
