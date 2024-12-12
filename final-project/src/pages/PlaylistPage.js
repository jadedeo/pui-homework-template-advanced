// general react, redux & axios
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// components
import Button from "@mui/material/Button";
import PlaylistDialog from "../components/PlaylistDialog";
import Header from "../components/Header";
import { Spotify } from "react-spotify-embed";

//styles
import "../css/home.css";
import "../css/playlistPage.css";

// testing framer motion, still a wip
import { motion } from "framer-motion";

const PlaylistPage = () => {
  // retrieve required infrom from state & local storage
  const tokenFromStorage = window.localStorage.getItem("token");
  const spotifyUser = useSelector((state) => state.spotifyUser);
  const title = useSelector((state) => state.title);
  const author = useSelector((state) => state.author);
  const character = useSelector((state) => state.character);
  const playlistTracks = useSelector((state) => state.playlistTracks);

  // create new state variable for controling modal
  const [open, setOpen] = useState(false);

  const [loaded, setLoaded] = useState(
    Array(playlistTracks.length).fill(false)
  );
  // const [playlistId, setPlaylistId] = useState(null);

  // handle opening & closing of modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // call pass createNewPlaylist & close modal
  const handleSavePlaylist = (name, description, isPublic) => {
    // console.log("Creating playlist with details:", name, description, isPublic);
    createNewPlaylist(name, description, isPublic);
    setOpen(false);
  };

  // use information provided to create a new playlist under the user's account
  const createNewPlaylist = async (name, description, isPublic) => {
    try {
      // make call to creat empty playlist
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
      // console.log("Playlist created:", data);
      // setPlaylistId(data.id);

      // call function to add tracks to new empty playlist
      addTracksToPlaylist(data.id);
    } catch (error) {
      // console.error("Error creating playlist:", error);
    }
  };

  // add tracks to new playlist given playlistId
  const addTracksToPlaylist = async (playlistId) => {
    const trackUris = playlistTracks.map((item) => item.uri);
    try {
      // make request to add tracks, providing the uri for each
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
        // console.log("Tracks added to the playlist");
      }
    } catch (error) {
      // console.error("Error adding tracks:", error);
    }
  };

  // for testing framer motion, still a wip
  useEffect(() => {
    const timers = playlistTracks.map((_, index) =>
      setTimeout(() => {
        setLoaded((prev) => {
          const newLoaded = [...prev];
          newLoaded[index] = true;
          return newLoaded;
        });
      }, 2000 + index * 100)
    );

    return () => timers.forEach(clearTimeout);
  }, [playlistTracks]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // playlist page display header and list of tracks using react spotify embed component
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
                // use of framer motion to control entrance animation, still a wip
                <motion.div
                  key={index}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {trackUrl ? (
                    // use embed component to display each track
                    <Spotify wide link={trackUrl} />
                  ) : (
                    <></>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* clicking on save button opens modal, where user can input info pertaining to their new playlist */}
          <Button
            id="save-playlist-button"
            variant="contained"
            onClick={handleClickOpen}
          >
            Save Playlist
          </Button>

          {/* this is the modal component */}
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
