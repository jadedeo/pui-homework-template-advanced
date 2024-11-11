import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlaylistType, setTitle, setAuthor, setCharacter } from "../actions";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const Form = () => {
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

          <div className="columns">
            <p>Title:</p>
            <TextField value={title} onChange={handleTitleChange} fullWidth />

            <p>Author:</p>
            <TextField value={author} onChange={handleAuthorChange} fullWidth />
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

          <Button variant="contained">Create Playlist</Button>
        </FormControl>
      </div>
    </div>
  );
};
export default Form;
