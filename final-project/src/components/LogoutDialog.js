import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

import "../css/dialog.css";

const LogoutDialog = ({ open, onClose, onSave }) => {
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
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <p>Any changes you have made will be lost.</p>
      </DialogContent>
      <DialogActions>
        <Button id="cancel-saving-playlist-button" onClick={onClose}>
          Cancel
        </Button>
        <Button id="save-playlist-button" onClick={handleSave}>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
