import { redirect } from '@sveltejs/kit';
import { getUserSavedTracks } from '$lib/spotify-api';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from '$env/static/private';

async function getAccessToken(code, codeVerifier) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: SPOTIFY_REDIRECT_URI,
            client_id: SPOTIFY_CLIENT_ID,
            code_verifier: codeVerifier
        })
    });

    return response.json();
}

export async function load({ url, cookies }) {
    const code = url.searchParams.get('code');
    const codeVerifier = cookies.get('codeVerifier');
    
    try {
        const tokenResponse = await getAccessToken(code, codeVerifier);
        
        if (tokenResponse.error) {
            console.error('Token Error:', tokenResponse.error, tokenResponse.error_description);
            throw redirect(302, '/');
        }

        // const userProfile = await getUserProfile(tokenResponse.access_token);
        // const tracksResponse = await getUserSavedTracks(tokenResponse.access_token);
        // console.log(typeof(tracksResponse.items), tracksResponse);
        // const tracksData = tracksResponse.items.map(item => {
        //     const track = item.track;
        //     const artist = track.artists[0];

        //     return {
        //         trackId: track.id,
        //         trackName: track.name,
        //         trackHref: track.external_urls.spotify,
        //         artistHref: artist.external_urls.spotify,
        //         artistName: artist.name
        //     };
        // });

        cookies.set('spotifyAccessToken', tokenResponse.access_token, { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
        cookies.set('spotifyRefreshToken', tokenResponse.refresh_token, { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
        cookies.delete('codeVerifier', { path: '/' });

        return { 
            // profile: userProfile, 
            accessToken: tokenResponse.access_token
            // userSavedTracks: tracksData
        };
    } catch (error) {
        console.error('Error during Spotify authentication:', error);
        throw redirect(302, '/');
    }
}

