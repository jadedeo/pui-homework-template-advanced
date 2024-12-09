const keywordReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_KEYWORD":
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default keywordReducer;
