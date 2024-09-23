// client requests to spotify web api using access token

export async function getUserSavedTracks(accessToken) {
    console.log("accessToken", accessToken)
    const response = await fetch('https://api.spotify.com/v1/me/tracks', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    return response.json().items;
}