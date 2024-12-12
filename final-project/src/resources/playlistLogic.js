// functions used for performing playlist creation logic

// identify playlists that meet search criteria
export async function searchSpotifyForPlaylists(query, accessToken) {
  const encodedQuery = encodeURIComponent(query);
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=playlist&q=${encodedQuery}&limit=2`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`ERROR status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data.playlists.items);
    return data.playlists.items;
  } catch (error) {
    console.error("ERROR ", error);
  }
}

// gets songs from playlists returned by searchSpotifyForPlaylists
export async function getTracksFromPlaylists(playlists, token) {
  const allTracks = [];
  for (const playlist of playlists) {
    if (!playlist) continue;

    try {
      let nextUrl = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;

      // loop through paginated results
      while (nextUrl) {
        const response = await fetch(nextUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`ERROR status: ${response.status}`);
        }

        const data = await response.json();
        console.log("PLAYLIST: ", playlist.name);

        // ensure data.items is valid
        if (data.items && Array.isArray(data.items)) {
          data.items.forEach((item) => {
            console.log(".....", item.track?.name);
            // add track to the list
            allTracks.push(item.track);
          });
        } else {
          console.warn("No valid items in playlist", playlist.name);
        }

        // check for pagination and move to the next page if it exists
        // get the url for the next page (if any)
        nextUrl = data.next;
      }
    } catch (error) {
      console.error("Error fetching tracks from playlist:", error);
    }
  }

  // console.log("allTracks", allTracks);
  return allTracks;
}

// randomly pick a certain number of tracks from pooled collection of songs returned by getTracksFromPlaylists
export function getRandomTracks(tracks, count = 5) {
  const shuffled = tracks?.sort(() => 0.5 - Math.random());
  return shuffled?.slice(0, count);
}
