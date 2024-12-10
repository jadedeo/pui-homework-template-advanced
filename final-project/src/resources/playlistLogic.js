// playlistLogic.js

export async function searchSpotifyForPlaylists(query, accessToken) {
  const encodedQuery = encodeURIComponent(query);
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=playlist&q=${encodedQuery}&limit=5`,
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

export async function getTracksFromPlaylists(playlists, token) {
  const allTracks = [];
  for (const playlist of playlists) {
    if (!playlist) continue; // Skip if no playlist

    try {
      let nextUrl = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;

      // Loop through paginated results
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

        // Ensure data.items is valid
        if (data.items && Array.isArray(data.items)) {
          data.items.forEach((item) => {
            console.log(".....", item.track?.name); // Log track name
            allTracks.push(item.track); // Add track to the list
          });
        } else {
          console.warn("No valid items in playlist", playlist.name);
        }

        // Check for pagination and move to the next page if it exists
        nextUrl = data.next; // Get the URL for the next page (if any)
      }
    } catch (error) {
      console.error("Error fetching tracks from playlist:", error);
    }
  }

  console.log("allTracks", allTracks);
  return allTracks;
}

export function getRandomTracks(tracks, count = 5) {
  // console.log("!!!!", tracks);
  const shuffled = tracks?.sort(() => 0.5 - Math.random());
  // console.log(shuffled?.slice(0, count));
  return shuffled?.slice(0, count);
}
