import React, { useState } from "react";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

import "../css/dialog.css";

const PlaylistDialog = ({ open, onClose, onSave }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlistIsPublic, setPlaylistIsPublic] = useState(false);

  const handleSave = () => {
    onSave(playlistName, playlistDescription, playlistIsPublic);
    setPlaylistName("");
    setPlaylistDescription("");
    setPlaylistIsPublic(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Playlist Details</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset" fullWidth>
          <FormLabel htmlFor="playlist-name-input-label">
            Playlist Name
          </FormLabel>
          <TextField
            hiddenLabel
            autoFocus
            margin="dense"
            id="playlist-name-input-label"
            type="text"
            fullWidth
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </FormControl>
        <FormControl component="fieldset" fullWidth>
          <FormLabel htmlFor="playlist-description-input-label">
            Playlist Description
          </FormLabel>
          <TextField
            hiddenLabel
            margin="dense"
            id="playlist-description-input-label"
            type="text"
            fullWidth
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
          />
        </FormControl>
        <FormControlLabel
          id="playlist-visbility-checkbox"
          control={
            <Checkbox
              checked={playlistIsPublic}
              onChange={() => setPlaylistIsPublic(!playlistIsPublic)}
            />
          }
          label="Set playlist visibility to public"
        />
      </DialogContent>
      <DialogActions>
        <Button
          id="cancel-saving-playlist-button"
          variant="outlined"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          id="save-playlist-button"
          onClick={handleSave}
          variant="contained"
        >
          Save Playlist
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistDialog;
