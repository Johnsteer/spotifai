import { redirect } from '@sveltejs/kit';
import { getAuthUrl } from '$lib/server/spotify-auth-server';

export function load({ cookies }) {
    const { url, codeVerifier } = getAuthUrl();
    cookies.set('codeVerifier', codeVerifier, { path: '/', httpOnly: true, secure: true, sameSite: 'lax' });
    throw redirect(302, url);
}