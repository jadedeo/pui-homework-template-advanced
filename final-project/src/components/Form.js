import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPlaylistType, setTitle, setAuthor, setCharacter } from "../actions";

import genres from "../resources/genres.json";
import moods from "../resources/moods.json";

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

import ChipInput from "./ChipInput";

const Form = () => {
  const dispatch = useDispatch();
  const playlistType = useSelector((state) => state.playlistType);
  // const title = useSelector((state) => state.title);
  const title = "The Secret History";
  const author = useSelector((state) => state.author);
  // const character = useSelector((state) => state.character);
  const character = "Henry Winter";

  const [myGenres, setMyGenres] = useState([]);
  const [myMoods, setMyMoods] = useState([]);
  const [keywords, setKeywords] = useState(["Academia"]);
  const [token, setToken] = useState("");

  const handleKeywordsChange = (newKeywords) => {
    setKeywords(newKeywords);
  };

  useEffect(() => {
    const tokenFromStorage = window.localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, []);

  const handleChange = (event, type) => {
    const {
      target: { value },
    } = event;
    if (type === "genre") {
      setMyGenres(typeof value === "string" ? value.split(",") : value);
    } else if (type === "mood") {
      setMyMoods(typeof value === "string" ? value.split(",") : value);
    }
  };

  const getSimilarPlaylists = async () => {
    try {
      const query = createSearchQuery(title, character, keywords);
      const playlists = await searchSpotifyForPlaylists(query, token);
      const tracks = await getTracksFromPlaylists(playlists);
      console.log(tracks);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data.items);

        // const tracks = data.items;
        for (const item of data.items) {
          // console.log(item.track.name, item.track.id);

          allTracks.push(item);
        }

        // return data.items;
      } catch (error) {
        console.error("Error:", error);
      }
    }
    // console.log(allTracks);
    return allTracks;
  }

  const createSearchQuery = (title, character, keywords) => {
    let queryParts = [];

    console.log(title, character, keywords);

    if (title) {
      queryParts.push(`"${title}"`);
      // console.log(title);
    }
    if (character) {
      queryParts.push(`"${character}"`);
    }
    if (keywords && keywords.length > 0) {
      keywords.forEach((keyword) => {
        queryParts.push(`"${keyword}"`);
      });
    }

    return queryParts.join(" OR ");
  };

  async function searchSpotifyForPlaylists(query, accessToken) {
    const encodedQuery = encodeURIComponent(query);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=playlist&q=${encodedQuery}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.playlists.items;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div id="form-container">
      <div id="form-content">
        <FormControl component="fieldset">
          <FormLabel id="playlist-type-radio-label">
            I would like to create a playlist for:
          </FormLabel>
          <RadioGroup
            aria-labelledby="playlist-type-radio-label"
            defaultValue="book"
            name="playlist-type"
            row
            onChange={(e) => dispatch(setPlaylistType(e.target.value))}
            value={playlistType}
          >
            <FormControlLabel value="book" control={<Radio />} label="A book" />
            <FormControlLabel
              value="character"
              control={<Radio />}
              label="A book character"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth>
          <TextField
            label="Title"
            // value="The Secret History"
            value={title}
            onChange={(e) => dispatch(setTitle(e.target.value))}
            fullWidth
          />
          {/* <TextField
            label="Author"
            value={author}
            onChange={(e) => dispatch(setAuthor(e.target.value))}
            fullWidth
          /> */}
          {playlistType === "character" && (
            <TextField
              label="Character"
              value={character}
              onChange={(e) => dispatch(setCharacter(e.target.value))}
              fullWidth
            />
          )}
        </FormControl>

        <FormControl component="fieldset" fullWidth>
          <p>Mood</p>
          <Select
            multiple
            value={myMoods}
            onChange={(e) => handleChange(e, "mood")}
            input={<OutlinedInput label="Moods" />}
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

        <FormControl component="fieldset" fullWidth>
          <p>Genre</p>
          <Select
            multiple
            value={myGenres}
            onChange={(e) => handleChange(e, "genre")}
            input={<OutlinedInput label="Genres" />}
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
        </FormControl>

        <p>Keywords</p>
        <FormControl>
          <ChipInput
            label=""
            value={keywords}
            onChange={handleKeywordsChange}
            placeholder="Type and press enter"
          />
        </FormControl>

        <Button
          variant="contained"
          component={Link}
          onClick={getSimilarPlaylists} /*to="/playlist"*/
        >
          Create Playlist
        </Button>
        <p>Token: {token}</p>
      </div>
    </div>
  );
};
export default Form;
