import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "@mui/material/Button";
import { Spotify } from "react-spotify-embed";
import Header from "../components/Header";

import "../css/home.css";
import "../css/playlistPage.css";

const PlaylistPage = () => {
  const tokenFromStorage = window.localStorage.getItem("token");
  const spotifyUser = useSelector((state) => state.spotifyUser);

  const title = useSelector((state) => state.title);
  const author = useSelector((state) => state.author);
  const character = useSelector((state) => state.character);
  const playlistTracks = useSelector((state) => state.playlistTracks);

  let playlist_name = null;
  let playlist_description = null;
  let playlist_isPublic = null;
  let playlist_id = null;

  const handleSavePlaylist = () => {
    console.log(spotifyUser.display_name);

    //use modal to ask user for this info:
    playlist_name = "My Amazing Spectacular Showstopping Playlist";
    playlist_description = "Some description here.";
    playlist_isPublic = false;

    createNewPlaylist();
  };

  const createNewPlaylist = async () => {
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${spotifyUser.id}/playlists`,
        {
          name: playlist_name,
          description: playlist_description,
          public: playlist_isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error(`ERORR status: ${response.status}`);
      }

      const data = response.data;
      console.log("playlist created:", data);
      playlist_id = data.id;
      addTracksToPlaylist(playlist_id);
    } catch (error) {
      console.error("error creating playlist:", error);
    }
  };

  const addTracksToPlaylist = async (playlistId) => {
    const trackUris = playlistTracks.map((item) => item.track.uri);
    console.log(playlistId);

    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        {
          uris: trackUris,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("tracks added to the playlist");
      } else {
        console.error("error adding tracks:", response.status);
      }
    } catch (error) {
      console.error("error adding tracks:", error);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div id="playlist-page-container">
          <div>
            <h4>
              Here's your playlist for {character ? `${character} from ` : ""}"
              {title}" by {author}!
            </h4>
            <p>
              If you’d like to save it to your library, please click the button
              in the bottom right.
            </p>
          </div>
          <div id="playlist-list">
            {playlistTracks.map((item) => (
              <Spotify
                // style={{ backgroundColor: "red" }}
                key={item.track.id}
                wide
                link={item.track.external_urls?.spotify}
              />
            ))}
          </div>
          <Button
            id="save-playlist-button"
            variant="contained"
            onClick={handleSavePlaylist}
          >
            Save Playlist
          </Button>
        </div>
      </main>
    </>
  );
};

export default PlaylistPage;
