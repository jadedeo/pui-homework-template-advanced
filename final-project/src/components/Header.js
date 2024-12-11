import "../css/home.css";
import "../css/header.css";

import { useSelector, useDispatch } from "react-redux";
import { resetSpotifyUser } from "../actions";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const spotifyUser = useSelector((state) => state.spotifyUser);
  console.log("spotifyUser from HEADER", spotifyUser);

  const handleLogoutClick = () => {
    // Clear local storage
    localStorage.removeItem("title");
    localStorage.removeItem("author");
    localStorage.removeItem("character");
    localStorage.removeItem("playlistTracks");

    localStorage.removeItem("token");
    localStorage.removeItem("spotifyUser");

    // Dispatch an action to reset the user state
    dispatch(resetSpotifyUser());

    // Navigate to the home page or login page
    navigate("/");
  };

  return (
    <header id="header-container">
      <div id="header-content">
        <div id="books-header-content">
          <div>
            <img
              alt="stack of books emoji"
              id="books-favicon"
              src="assets/application/books.svg"
              height="30"
            />
          </div>
          <div>
            <h1>LitTunes</h1>
            <h4>Soundtracks for your shelf.</h4>
          </div>
        </div>

        {spotifyUser && (
          <div id="user-logout-container">
            {/* {spotifyUser.images[1] && ( */}
            <div id="user-image-name">
              {/* <img
                id="user-image"
                src={spotifyUser?.images[1]?.url}
                alt="User's Spotify profile image"
              /> */}

              <h4>{spotifyUser.display_name}</h4>
            </div>
            {/* )} */}
            <div
              id="divider"
              style={{
                backgroundColor: "white",
                width: "1px",
                height: "2em",
              }}
            ></div>
            <div>
              <Button variant="contained" onClick={handleLogoutClick}>
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
