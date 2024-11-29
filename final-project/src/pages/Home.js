import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Home = () => {
  const CLIENT_ID = "ce9eb5d8d8314180a0c10ed4fd87001d";
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  // useEffect with no dependencies called after initial mount & after every render
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    // extract access_token from url
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      // console.log("TOKEN:", token);
      window.location.hash = "";
      // save token to local storage
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  // const searchArtists = async (e) => {
  //   e.preventDefault();
  //   const { data } = await axios.get("https://api.spotify.com/v1/search", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     params: {
  //       q: searchKey,
  //       type: "artist",
  //     },
  //   });

  //   console.log("DATA:", data);
  //   setArtists(data.artists.items);
  // };

  // const renderArtists = () => {
  //   return artists.map((artist) => (
  //     <div key={artist.id}>
  //       {artist.images.length ? (
  //         <img width={"100%"} src={artist.images[0].url} alt="" />
  //       ) : (
  //         <div>No Image</div>
  //       )}
  //       {artist.name}
  //     </div>
  //   ));
  // };

  const handleSignIn = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
  };

  return (
    <main>
      <div id="home-container">
        <div id="home-text-content">
          <div>
            <h1>*~LitTunes~* wow</h1>
            <h3>some container with introductory information idk</h3>
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
        </div>

        <div>
          {/* only display search field & list of artists if token exists */}
          {/* {token ? (
            <form onSubmit={searchArtists}>
              <input
                type="text"
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <button type="submit">SUBMIT</button>
              {renderArtists()}
            </form>
          ) : (
            ""
          )} */}
        </div>

        {/* send user to spotify url to authorize their account */}
        {!token && (
          <Button variant="contained" onClick={handleSignIn}>
            SIGN IN
          </Button>
        )}
        {token && (
          <Link to="/form">
            <Button variant="contained">Start</Button>
          </Link>
        )}
      </div>
    </main>
  );
};

export default Home;
