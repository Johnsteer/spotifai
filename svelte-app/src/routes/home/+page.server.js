import { browser } from '$app/environment';
import { accessToken } from '$lib/stores';

export async function load({ fetch, cookies }) {
    const token = cookies.get('spotifyAccessToken');

    const response = await fetch('https://api.spotify.com/v1/me/tracks', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();

    const tracksData = data.items.map(item => {
                const track = item.track;
                const artist = track.artists[0];

                return {
                    trackId: track.id,
                    trackName: track.name,
                    trackHref: track.external_urls.spotify,
                    artistHref: artist.external_urls.spotify,
                    artistName: artist.name
                };
            });


    return {savedTracks: tracksData};
}