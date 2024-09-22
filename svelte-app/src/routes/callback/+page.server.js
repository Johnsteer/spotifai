import { redirect } from '@sveltejs/kit';
import { getAccessToken, getUserProfile } from '$lib/server/spotify-auth-server';

export async function load({ url, cookies }) {
    const code = url.searchParams.get('code');
    const codeVerifier = cookies.get('codeVerifier');

    console.log("code", code);
    console.log("codeVerifier", codeVerifier);
    
    if (!code || !codeVerifier) {
        console.error('Missing code or code verifier');
        throw redirect(302, '/');
    }

    try {
        const tokenResponse = await getAccessToken(code, codeVerifier);
        
        if (tokenResponse.error) {
            console.error('Token Error:', tokenResponse.error, tokenResponse.error_description);
            throw redirect(302, '/login');
        }

        const userProfile = await getUserProfile(tokenResponse.access_token);

        cookies.set('spotifyAccessToken', tokenResponse.access_token, { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
        cookies.set('spotifyRefreshToken', tokenResponse.refresh_token, { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
        cookies.delete('codeVerifier', { path: '/' });

        return { profile: userProfile };
    } catch (error) {
        console.error('Error during Spotify authentication:', error);
        throw redirect(302, '/login');
    }
}