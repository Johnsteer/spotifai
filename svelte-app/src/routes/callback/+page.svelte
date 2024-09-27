<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { profile, accessToken, userSavedTracks } from '$lib/stores';

    export let data;

    
    onMount(() => {
        if (data.accessToken) {
            // profile.set(data.profile);
            // console.log("rofile store updated: ", data.profile);
            accessToken.set(data.accessToken);
            console.log("accessToken store updated: ", data.accessToken);
            // userSavedTracks.set(data.userSavedTracks);
            // console.log("userSavedTracks store updated: ", data.userSavedTracks);
            goto('/home');
        } else {
            goto('/');
        }
    });
</script>

<p>Processing login...</p>