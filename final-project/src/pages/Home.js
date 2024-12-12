// general react, redux, axios & router
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { setSpotifyUser } from "../actions";

// components
import Button from "@mui/material/Button";

// home component drives the authentication flow, obtaining a token to be used in api calls
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);

  // set variables to be used as parameters, getting values from .env/.env.production as needed
  const CLIENT_ID = "ce9eb5d8d8314180a0c10ed4fd87001d";
  const SCOPE = "playlist-modify-private user-read-private";
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  // function for exchanging authorization code for a token
  const exchangeCodeForToken = async (code) => {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }).toString();

    //send request for token
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const { access_token, refresh_token } = response.data;
      console.log("Tokens received:", access_token, refresh_token);

      //save token
      setToken(access_token);
      localStorage.setItem("token", access_token);

      // use token to get user's account data
      fetchUserProfile(access_token);

      // move to form page
      navigate("/form");
    } catch (error) {
      console.error(
        "Error during token exchange:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // use debounce to prevent exchangeCodeForToken from being executed until 1 second has passed without it being triggered again
  const debouncedExchangeCode = debounce(exchangeCodeForToken, 1000, {
    leading: true,
    trailing: false,
  });

  // extracts code from url, then uses it to call debouncedExchangeCode; will run only when debouncedExchangeCode changes
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      debouncedExchangeCode(code);
    }
  }, [debouncedExchangeCode]);

  // using newly obtained token, get the user's general account data & save to state & localStorage (will be needed when saving playlist to their account)
  const fetchUserProfile = async (accessToken) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log("User Profile:", data);
      localStorage.setItem("spotifyUser", JSON.stringify(data));
      dispatch(setSpotifyUser(data));
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // jsx for home page displays basic introductory content
  return (
    <main id="main-home">
      <div id="home-container">
        <div id="home-text-content">
          <div id="home-heading">
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
          {/* <div>
            <h1>LitTunes</h1>
            <h3>Soundtracks for your shelf.</h3>
          </div> */}
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              dui magna, rutrum ac mauris feugiat, dictum congue dui. Vestibulum
              varius turpis in mauris iaculis ornare. Praesent suscipit felis
              ipsum, sed consequat orci feugiat nec. Quisque varius, leo et
              feugiat porttitor, nunc lectus mollis lectus, in dapibus risus
              nulla tristique leo.
            </p>
          </div>
          {!token ? (
            <Button
              variant="contained"
              // sends user a spotify url where they can give the app the required permissions
              onClick={() => {
                const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
                  REDIRECT_URI
                )}&scope=${encodeURIComponent(
                  SCOPE
                )}&response_type=code&show_dialog=true`;
                window.location = authUrl;
              }}
            >
              SIGN IN
            </Button>
          ) : (
            <Button variant="contained">Start Creating Playlists</Button>
          )}
        </div>
        <div id="home-img-container">
          <img
            id="home-img"
            src="assets/application/LitTunesHome.png"
            alt="Image of sample playlist made for Leigh Bardugo's 'Six of Crows', overlayed with an image of the book cover"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
