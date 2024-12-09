import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

import { setSpotifyUser } from "../actions";

const Home = () => {
  const dispatch = useDispatch();

  const CLIENT_ID = "ce9eb5d8d8314180a0c10ed4fd87001d";
  const CLIENT_SECRET = "94d0a0eed96f49d2830a65abf06d008b";
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const TOKEN_URL = "https://accounts.spotify.com/api/token";
  const RESPONSE_TYPE = "code";

  const [token, setToken] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    console.log("Authorization code received:", code);

    if (code) {
      exchangeCodeForToken(code);
    } else {
      let token = window.localStorage.getItem("token");
      setToken(token);
    }
  }, []);

  const exchangeCodeForToken = async (code) => {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);

    console.log("Exchanging code for token with parameters:", {
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    try {
      const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
      const response = await axios.post(TOKEN_URL, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`,
        },
      });

      console.log("Token exchange successful:", response.data);

      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;

      window.localStorage.setItem("token", accessToken);
      setToken(accessToken);

      fetchUserProfile(accessToken);
    } catch (error) {
      console.error(
        "Error exchanging code for token:",
        error.response ? error.response.data : error
      );
    }
  };

  const fetchUserProfile = async (accessToken) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log("User Profile:", data);
      dispatch(setSpotifyUser(data));
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleSignIn = () => {
    const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&show-dialog=true&scope=playlist-modify-public playlist-modify-private`;
    console.log("Redirecting to login URL:", loginUrl);
    window.location.href = loginUrl;
  };

  return (
    <main>
      <div id="home-container">
        <div id="home-text-content">
          <div>
            <h1>LitTunes</h1>
            <h3>Soundtracks for your shelf.</h3>
          </div>
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

          {/* Only show sign-in button if there's no token */}
          {!token ? (
            <Button variant="contained" onClick={handleSignIn}>
              SIGN IN
            </Button>
          ) : (
            <Link to="/form">
              <Button variant="contained">Start</Button>
            </Link>
          )}
        </div>
        <div id="home-img-container">
          <img id="home-img" src="assets/proposal/PlaylistPage.png" />
        </div>
      </div>
    </main>
  );
};

export default Home;
