// general react, redux & router
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// redux actions
import {
  setPlaylistType,
  setTitle,
  setAuthor,
  setMood,
  setKeyword,
  setCharacter,
  setPlaylistTracks,
} from "../actions";

// components
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
  // OutlinedInput,
  Input,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import ChipInput from "./ChipInput";

// utility functions
import {
  searchSpotifyForPlaylists,
  getTracksFromPlaylists,
  getRandomTracks,
} from "../resources/playlistLogic";

// data
import moods from "../resources/moods.json";

// stylesheet
import "../css/form.css";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [token, setToken] = useState("");

  //retrieving values from redux state
  const playlistType = useSelector((state) => state.playlistType);
  const title = useSelector((state) => state.title);
  const author = useSelector((state) => state.author);
  const character = useSelector((state) => state.character);
  const playlistTracks = useSelector((state) => state.playlistTracks);
  const [myMoods, setMyMoods] = useState(useSelector((state) => state.mood));
  const [keywords, setKeywords] = useState(
    useSelector((state) => state.keyword)
  );

  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // get token needed for api requests from state
  useEffect(() => {
    const tokenFromStorage = window.localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, []);

  // handle mood changes
  const handleChange = (event, type) => {
    const {
      target: { value },
    } = event;
    setMyMoods(typeof value === "string" ? value.split(",") : value);
  };

  // dispatch mood changes once state is updated
  useEffect(() => {
    if (myMoods.length > 0) {
      dispatch(setMood(myMoods));
    }
  }, [myMoods, dispatch]);

  // handle keywords changes
  const handleKeywordsChange = (newKeywords) => {
    setKeywords(newKeywords);
  };

  // dispatch keywords changes once state is updated
  useEffect(() => {
    if (keywords.length > 0) {
      dispatch(setKeyword(keywords));
    }
  }, [keywords, dispatch]);

  // form validation logic
  const validateForm = () => {
    const isTitleValid = title.trim() !== "";
    const isAuthorValid = author.trim() !== "";
    const isCharacterValid =
      playlistType === "character" ? character.trim() !== "" : true;

    setIsValid(isTitleValid && isAuthorValid && isCharacterValid);
  };

  // perform validation when any of the fields change
  useEffect(() => {
    validateForm();
  }, [title, author, character, playlistType]);

  // perform playlist creation logic
  const performCreationLogic = async () => {
    // start loading state
    setIsLoading(true);

    console.log("--------------------------------");
    console.log(title, character, keywords, myMoods);
    console.log("--------------------------------");
    try {
      let allTracks = [];
      let hasCharacter = character ? true : false;

      // get songs that match 'title'
      const titlePlaylists = await searchSpotifyForPlaylists(title, token);
      const titleTracks = await getTracksFromPlaylists(titlePlaylists, token);
      allTracks.push(...getRandomTracks(titleTracks, hasCharacter ? 5 : 10));

      // get songs that match 'character'
      if (character) {
        const characterPlaylists = await searchSpotifyForPlaylists(
          character,
          token
        );
        const characterTracks = await getTracksFromPlaylists(
          characterPlaylists,
          token
        );
        allTracks.push(...getRandomTracks(characterTracks));
      }

      // get songs that match 'mood'
      for (let md of myMoods) {
        const moodPlaylists = await searchSpotifyForPlaylists(md, token);
        const moodTracks = await getTracksFromPlaylists(moodPlaylists, token);
        allTracks.push(...getRandomTracks(moodTracks));
      }

      // get songs that match 'keywords'
      for (let kw of keywords) {
        const keywordPlaylists = await searchSpotifyForPlaylists(kw, token);
        const keywordTracks = await getTracksFromPlaylists(
          keywordPlaylists,
          token
        );
        allTracks.push(...getRandomTracks(keywordTracks));
      }

      console.log(allTracks);

      // add list of tracks to state
      dispatch(setPlaylistTracks(allTracks));

      // navigate to next page/playlist page
      navigate("/playlist");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // end loading state
      setIsLoading(false);
    }
  };

  const handlePlaylistTypeChange = (event) => {
    const newType = event.target.value;
    dispatch(setPlaylistType(newType));

    // clear the character field if the playlist type is changed to "book"
    if (newType === "book") {
      dispatch(setCharacter(""));
    }
  };

  // jsx for form - uses mui components
  return (
    <div id="form-container">
      <div id="form-content">
        {isLoading ? (
          <div id="loading-container">
            <div>
              <h3>Creating your playlist</h3>
            </div>
            <CircularProgress size="4rem" />
          </div>
        ) : (
          <>
            <FormControl component="fieldset">
              <div id="playlist-type-form-control">
                <FormLabel htmlFor="playlist-type-radio-group">
                  I would like to create a playlist for:
                </FormLabel>
                <RadioGroup
                  id="playlist-type-radio-group"
                  defaultValue="book"
                  name="playlist-type"
                  row
                  onChange={handlePlaylistTypeChange}
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
                  <FormLabel htmlFor="title-input-label">Title *</FormLabel>
                  <TextField
                    // variant="outlined"
                    variant="standard"
                    id="title-input-label"
                    value={title}
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                    fullWidth
                  />
                </FormControl>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel htmlFor="author-input-label">Author *</FormLabel>
                  <TextField
                    // variant="outlined"
                    variant="standard"
                    id="author-input-label"
                    value={author}
                    onChange={(e) => dispatch(setAuthor(e.target.value))}
                    fullWidth
                  />
                </FormControl>
              </div>

              {playlistType === "character" && (
                <FormControl component="fieldset" fullWidth>
                  <FormLabel htmlFor="character-input-label">
                    Character Name *
                  </FormLabel>
                  <TextField
                    // variant="outlined"
                    variant="standard"
                    id="character-input-label"
                    value={character}
                    onChange={(e) => dispatch(setCharacter(e.target.value))}
                    fullWidth
                  />
                </FormControl>
              )}
            </div>

            <div id="mood-keyword-container">
              <FormControl component="fieldset" fullWidth>
                <FormLabel htmlFor="mood-input">Mood</FormLabel>
                <Select
                  multiple
                  value={myMoods}
                  onChange={(e) => handleChange(e, "mood")}
                  input={<Input id="mood-input" variant="standard" />}
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
              onClick={performCreationLogic}
              disabled={!isValid}
            >
              Create Playlist
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
