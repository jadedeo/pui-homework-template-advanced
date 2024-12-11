import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "@mui/material/Button";
import { Spotify } from "react-spotify-embed";
import Header from "../components/Header";
import PlaylistDialog from "../components/PlaylistDialog";

import "../css/home.css";
import "../css/playlistPage.css";

import { motion } from "framer-motion";

const PlaylistPage = () => {
  const tokenFromStorage = window.localStorage.getItem("token");
  const spotifyUser = useSelector((state) => state.spotifyUser);

  const title = useSelector((state) => state.title);
  const author = useSelector((state) => state.author);
  const character = useSelector((state) => state.character);
  const playlistTracks = useSelector((state) => state.playlistTracks);

  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(
    Array(playlistTracks.length).fill(false)
  );
  const [playlistId, setPlaylistId] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSavePlaylist = (name, description, isPublic) => {
    console.log("Creating playlist with details:", name, description, isPublic);
    createNewPlaylist(name, description, isPublic);
    setOpen(false);
  };

  const createNewPlaylist = async (name, description, isPublic) => {
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${spotifyUser.id}/playlists`,
        {
          name,
          description,
          public: isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error(`ERROR status: ${response.status}`);
      }

      const data = response.data;
      console.log("Playlist created:", data);
      setPlaylistId(data.id);
      addTracksToPlaylist(data.id);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const addTracksToPlaylist = async (playlistId) => {
    const trackUris = playlistTracks.map((item) => item.uri);
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
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
        console.log("Tracks added to the playlist");
      }
    } catch (error) {
      console.error("Error adding tracks:", error);
    }
  };

  useEffect(() => {
    const timers = playlistTracks.map(
      (_, index) =>
        setTimeout(() => {
          setLoaded((prev) => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
          });
        }, 2000 + index * 100) // Adding a small stagger for each track
    );

    return () => timers.forEach(clearTimeout);
  }, [playlistTracks]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Header />
      <main>
        <div id="playlist-page-container">
          <div>
            <h4>
              Here's your playlist for {character ? `${character} from ` : ""}"
              {""}
              {title}" by {author}!
            </h4>
            <p>
              If you’d like to save it to your library, please click the button
              in the bottom right.
            </p>
          </div>
          <div id="playlist-list">
            {playlistTracks.map((item, index) => {
              const trackUrl = item.external_urls?.spotify;
              return (
                <motion.div
                  key={index}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {trackUrl ? (
                    <Spotify wide link={trackUrl} />
                  ) : (
                    <p>Invalid URL for {item.name}</p>
                  )}
                </motion.div>
              );
            })}
          </div>

          <Button
            id="save-playlist-button"
            variant="contained"
            onClick={handleClickOpen}
          >
            Save Playlist
          </Button>

          <PlaylistDialog
            open={open}
            onClose={handleClose}
            onSave={handleSavePlaylist}
          />
        </div>
      </main>
    </>
  );
};

export default PlaylistPage;
