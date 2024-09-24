// client requests to spotify web api using access token

export async function getUserSavedTracks(accessToken) {
    let savedTracks = [];
    console.log("called getUserSavedTracks");
    const response = await fetch('https://api.spotify.com/v1/me/tracks', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data;
}