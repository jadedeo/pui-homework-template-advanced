import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlaylistType, setTitle, setAuthor, setCharacter } from "../actions";
import axios from "axios";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import Checkbox from "@mui/material/Checkbox";
// import Select from "@mui/material/Select";
// import Chip from "@mui/material/Chip";

const Form = () => {
  const CLIENT_ID = "ce9eb5d8d8314180a0c10ed4fd87001d";
  // const REDIRECT_URI = "http://localhost:3000/";
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      console.log("TOKEN:", token);
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const dispatch = useDispatch();
  const playlistType = useSelector((state) => state.playlistType);
  const title = useSelector((state) => state.title);
  const author = useSelector((state) => state.author);
  const character = useSelector((state) => state.character);

  const handlePlaylistTypeChange = (e) => {
    dispatch(setPlaylistType(e.target.value));
  };
  const handleTitleChange = (e) => {
    dispatch(setTitle(e.target.value));
  };
  const handleAuthorChange = (e) => {
    dispatch(setAuthor(e.target.value));
  };
  const handleCharacterChange = (e) => {
    dispatch(setCharacter(e.target.value));
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    console.log("DATA:", data);
    setArtists(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"100%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  return (
    <div id="form-container">
      <div id="form-content">
        <FormControl>
          <div className="columns">
            <FormLabel id="playlist-type-radio-label">
              I would like to create a playlist for:
            </FormLabel>
            <RadioGroup
              aria-labelledby="playlist-type-radio-label"
              defaultValue="book"
              name="playlist-type"
              row
              onChange={handlePlaylistTypeChange}
              value={playlistType}
            >
              <FormControlLabel
                value="book"
                control={<Radio />}
                label="A book"
              />
              <FormControlLabel
                value="character"
                control={<Radio />}
                label="A book character"
              />
            </RadioGroup>
          </div>

          <div id="text-fields">
            <div className="columns">
              <p>Title:</p>
              <TextField value={title} onChange={handleTitleChange} fullWidth />

              <p>Author:</p>
              <TextField
                value={author}
                onChange={handleAuthorChange}
                fullWidth
              />
            </div>

            {/* if character selected */}
            {playlistType == "character" ? (
              <div>
                <p>Character:</p>
                <TextField
                  value={character}
                  onChange={handleCharacterChange}
                  fullWidth
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <Button variant="contained">Create Playlist</Button>

          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Log into Spotify
          </a>

          {token ? (
            <form onSubmit={searchArtists}>
              <input
                type="text"
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <button type="submit">SUBMIT</button>
              {renderArtists()}
            </form>
          ) : (
            ""
          )}
        </FormControl>
      </div>
    </div>
  );
};
export default Form;
