const characterReducer = (state = "Henry Winter", action) => {
  switch (action.type) {
    case "SET_CHARACTER":
      return action.payload !== undefined ? action.payload : state;
    default:
      return state;
  }
};
export default characterReducer;
