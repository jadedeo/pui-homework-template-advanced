// "what to do"
// actions are objects that signal a change to the store's state
// can accept a payload that is used to modify state

export const setPlaylistType = (newType) => {
  return {
    type: "CHANGE_TYPE",
    payload: newType,
  };
};

export const setTitle = (newTitle) => {
  try {
    localStorage.setItem("title", JSON.stringify(newTitle));
  } catch (e) {
    console.error("Error writing to localStorage", e);
  }
  return {
    type: "SET_TITLE",
    payload: newTitle,
  };
};

export const setAuthor = (newAuthor) => {
  try {
    localStorage.setItem("author", JSON.stringify(newAuthor));
  } catch (e) {
    console.error("Error writing to localStorage", e);
  }
  return {
    type: "SET_AUTHOR",
    payload: newAuthor,
  };
};

export const setCharacter = (newCharacter) => {
  try {
    localStorage.setItem("character", JSON.stringify(newCharacter));
  } catch (e) {
    console.error("Error writing to localStorage", e);
  }
  return {
    type: "SET_CHARACTER",
    payload: newCharacter,
  };
};

export const setMood = (newMood) => {
  return {
    type: "SET_MOOD",
    payload: newMood,
  };
};

export const setKeyword = (newKeyword) => {
  return {
    type: "SET_KEYWORD",
    payload: newKeyword,
  };
};

export const setPlaylistTracks = (playlistTracks) => {
  try {
    localStorage.setItem("playlistTracks", JSON.stringify(playlistTracks));
  } catch (e) {
    console.error("Error writing to localStorage", e);
  }
  return {
    type: "SET_PLAYLIST_TRACKS",
    payload: playlistTracks,
  };
};

export const setSpotifyUser = (userData) => {
  try {
    localStorage.setItem("spotifyUser", JSON.stringify(userData));
  } catch (e) {
    console.error("Error writing to localStorage", e);
  }
  return {
    type: "SET_SPOTIFY_USER",
    payload: userData,
  };
};

export const resetSpotifyUser = () => ({
  type: "RESET_SPOTIFY_USER",
});
