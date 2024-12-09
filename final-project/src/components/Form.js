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

// import genres from "../resources/genres.json";
import moods from "../resources/moods.json";

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
  const mood = useSelector((state) => state.mood);
  const keyword = useSelector((state) => state.keyword);

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
    // dispatch(setMood(myMoods));
  };

  useEffect(() => {
    if (myMoods.length > 0) {
      dispatch(setMood(myMoods)); // Dispatch the updated mood state
    }
  }, [myMoods, dispatch]);

  const performCreationLogic = async () => {
    try {
      //set up initial query using user inputs
      const query = createSearchQuery(title, character, keywords);

      //collect playlists that currently match query
      const playlists = (await searchSpotifyForPlaylists(query, token)) || [];

      //retrieve songs from those playlists
      const tracks = await getTracksFromPlaylists(playlists);
      console.log(`FETCHED TOTAL OF ${tracks.length} TRACKS`);
      console.log(tracks);

      //get first 10 tracks for testing purposes
      const shortenedTracks = tracks.slice(0, 10);
      console.log(shortenedTracks);

      //put tracks into state
      dispatch(setPlaylistTracks(shortenedTracks));
      navigate("/playlist");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createSearchQuery = (title, character, keywords) => {
    let queryParts = [];

    console.log(title, character, keywords);

    if (title) {
      queryParts.push(`"${title}"`);
    }
    if (character) {
      queryParts.push(`"${character}"`);
    }
    if (keywords && keywords.length > 0) {
      keywords.forEach((keyword) => {
        queryParts.push(`"${keyword}"`);
      });
    }

    console.log(queryParts.join(" OR "));
    return queryParts.join(" OR ");
  };

  async function searchSpotifyForPlaylists(query, accessToken) {
    const encodedQuery = encodeURIComponent(query);
    try {
      const response = await fetch(
        //only getting one playlist for testing purposes
        `https://api.spotify.com/v1/search?type=playlist&q=${title}&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`ERROR status: ${response.status}`);
      }

      const data = await response.json();
      return data.playlists.items;
    } catch (error) {
      console.error("ERROR ", error);
    }
  }

  async function getTracksFromPlaylists(playlists) {
    const allTracks = [];
    for (const playlist of playlists) {
      if (!playlist) {
        return;
      }

      console.log("FETCHING TRACKS IN", playlist.name, playlist.id);
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`ERROR status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`.... fetched ${data.items.length} tracks`);

        for (const item of data.items) {
          allTracks.push(item);
        }
      } catch (error) {
        console.error("ERROR", error);
      }
    }
    return allTracks;
  }

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
