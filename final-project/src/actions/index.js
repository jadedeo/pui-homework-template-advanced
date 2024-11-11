export const setPlaylistType = (newType) => {
  return {
    type: "CHANGE_TYPE",
    payload: newType,
  };
};

export const setTitle = (newTitle) => {
  return {
    type: "SET_TITLE",
    payload: newTitle,
  };
};

export const setAuthor = (newAuthor) => {
  return {
    type: "SET_AUTHOR",
    payload: newAuthor,
  };
};

export const setCharacter = (newCharacter) => {
  return {
    type: "SET_CHARACTER",
    payload: newCharacter,
  };
};
