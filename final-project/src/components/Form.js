import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPlaylistType, setTitle, setAuthor, setCharacter } from "../actions";

import genres from "../resources/genres.json";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

const Form = () => {
  const dispatch = useDispatch();
  const playlistType = useSelector((state) => state.playlistType);
  const title = useSelector((state) => state.title);
  const author = useSelector((state) => state.author);
  const character = useSelector((state) => state.character);

  //event listeners attached to fields that dispatch actions
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

  const [myGenres, setMyGenres] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMyGenres(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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

          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={myGenres}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.name} value={genre.name}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>

          <Link to="/playlist">
            <Button variant="contained">Create Playlist</Button>
          </Link>
        </FormControl>
      </div>
      <div>
        <p>{genres[0].name}</p>
      </div>
    </div>
  );
};
export default Form;
