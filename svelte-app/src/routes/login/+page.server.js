import { redirect } from '@sveltejs/kit';
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '$env/static/private';
import crypto from 'crypto';

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}

function generateCodeChallenge(codeVerifier) {
    const base64Digest = crypto
        .createHash('sha256')
        .update(codeVerifier)
        .digest('base64');
    return base64Digest
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function getAuthUrl() {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = generateCodeChallenge(codeVerifier);

    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('client_id', SPOTIFY_CLIENT_ID);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', SPOTIFY_REDIRECT_URI);
    authUrl.searchParams.append('scope', 'user-read-private user-read-email user-library-read');
    authUrl.searchParams.append('code_challenge_method', 'S256');
    authUrl.searchParams.append('code_challenge', codeChallenge);

    return { url: authUrl.toString(), codeVerifier };
}

export function load({ cookies }) {
    const { url, codeVerifier } = getAuthUrl();
    cookies.set('codeVerifier', codeVerifier, { path: '/', httpOnly: true, secure: true, sameSite: 'lax' });
    throw redirect(302, url);
}