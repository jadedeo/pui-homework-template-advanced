import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  setPlaylistType,
  setTitle,
  setAuthor,
  setMood,
  setKeyword,
  setCharacter,
  setPlaylistTracks,
} from "../actions";

import { useNavigate } from "react-router-dom";

import moods from "../resources/moods.json";
import {
  searchSpotifyForPlaylists,
  getTracksFromPlaylists,
  getRandomTracks,
} from "../resources/playlistLogic";

import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  TextField,
  Select,
  Box,
  Chip,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import ChipInput from "./ChipInput";

import "../css/form.css";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playlistType = useSelector((state) => state.playlistType);
  const title = useSelector((state) => state.title);
  const author = useSelector((state) => state.author);
  const character = useSelector((state) => state.character);
  // const mood = useSelector((state) => state.mood);
  // const keyword = useSelector((state) => state.keyword);

  const [myMoods, setMyMoods] = useState(useSelector((state) => state.mood));
  const [keywords, setKeywords] = useState(
    useSelector((state) => state.keyword)
  );
  const [token, setToken] = useState("");

  const handleKeywordsChange = (newKeywords) => {
    setKeywords(newKeywords);
    dispatch(setKeyword(newKeywords));
  };

  useEffect(() => {
    const tokenFromStorage = window.localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, []);

  const handleChange = (event, type) => {
    const {
      target: { value },
    } = event;
    setMyMoods(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if (myMoods.length > 0) {
      dispatch(setMood(myMoods));
    }
  }, [myMoods, dispatch]);

  const performCreationLogic = async () => {
    console.log("--------------------------------");
    try {
      // get songs that match 'title'
      const titlePlaylists = await searchSpotifyForPlaylists(title, token);
      const titleTracks = await getTracksFromPlaylists(titlePlaylists, token);
      const randomTitleTracks = getRandomTracks(titleTracks);

      // get songs that match 'character'
      const characterPlaylists = await searchSpotifyForPlaylists(
        character,
        token
      );
      const characterTracks = await getTracksFromPlaylists(
        characterPlaylists,
        token
      );
      const randomCharacterTracks = getRandomTracks(characterTracks);

      // const moodPlaylists = await searchSpotifyForPlaylists(mood, token);
      // const moodTracks = await getTracksFromPlaylists(moodPlaylists, token);
      // allTracks.push(...getRandomTracks(moodTracks));

      // for (let kw of keywords) {
      //   const keywordPlaylists = await searchSpotifyForPlaylists(kw, token);
      //   const keywordTracks = await getTracksFromPlaylists(
      //     keywordPlaylists,
      //     token
      //   );
      //   allTracks.push(...getRandomTracks(keywordTracks));
      // }

      // compile final list of tracks
      const allTracks = [...randomTitleTracks, ...randomCharacterTracks];
      console.log(`Total Tracks: ${allTracks.length}`);

      // dispatch(setPlaylistTracks(allTracks));
      // navigate("/playlist");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="form-container">
      <div id="form-content">
        <FormControl component="fieldset">
          <div id="playlist-type-form-control">
            <FormLabel id="playlist-type-radio-label">
              I would like to create a playlist for:
            </FormLabel>
            <RadioGroup
              id="playlist-type-radio-group"
              aria-labelledby="playlist-type-radio-label"
              defaultValue="book"
              name="playlist-type"
              row
              onChange={(e) => dispatch(setPlaylistType(e.target.value))}
              value={playlistType}
            >
              <FormControlLabel
                className="playlist-type-radio"
                value="book"
                control={<Radio />}
                label="A book"
              />
              <FormControlLabel
                className="playlist-type-radio"
                value="character"
                control={<Radio />}
                label="A book character"
              />
            </RadioGroup>
          </div>
        </FormControl>

        <div id="title-author-character-container">
          <div id="title-author-container">
            <FormControl component="fieldset" fullWidth>
              <FormLabel id="title-input-label">Title</FormLabel>
              <TextField
                hiddenlabel
                aria-labelledby="title-input-label"
                value={title}
                onChange={(e) => dispatch(setTitle(e.target.value))}
                fullWidth
              />
            </FormControl>
            <FormControl component="fieldset" fullWidth>
              <FormLabel id="author-input-label">Author</FormLabel>
              <TextField
                hiddenlabel
                aria-labelledby="author-input-label"
                value={author}
                onChange={(e) => dispatch(setAuthor(e.target.value))}
                fullWidth
              />
            </FormControl>
          </div>

          {playlistType === "character" && (
            <FormControl component="fieldset" fullWidth>
              <FormLabel id="character-input-label">Character</FormLabel>
              <TextField
                hiddenlabel
                aria-labelledby="character-input-label"
                value={character}
                onChange={(e) => dispatch(setCharacter(e.target.value))}
                fullWidth
              />
            </FormControl>
          )}
        </div>

        <div id="mood-keyword-container">
          <FormControl component="fieldset" fullWidth>
            <FormLabel id="mood-input-label">Mood</FormLabel>
            <Select
              hiddenlabel
              aria-labelledby="mood-input-label"
              multiple
              value={myMoods}
              onChange={(e) => handleChange(e, "mood")}
              input={<OutlinedInput />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {moods.map((mood) => (
                <MenuItem key={mood.name} value={mood.name}>
                  {mood.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <p>Keywords</p> */}
          <FormControl>
            <ChipInput
              label=""
              value={keywords}
              onChange={handleKeywordsChange}
              placeholder="Type and press enter"
            />
          </FormControl>
        </div>

        <Button
          id="create-playlist-button"
          variant="contained"
          component={Link}
          onClick={performCreationLogic} /*to="/playlist"*/
        >
          Create Playlist
        </Button>
        <p>Token: {token}</p>
      </div>
    </div>
  );
};
export default Form;
