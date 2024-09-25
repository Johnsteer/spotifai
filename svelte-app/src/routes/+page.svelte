<script>
    import TracksTable from '$lib/components/TracksTable.svelte';
    import { profile, accessToken } from '$lib/stores';
    import { getUserSavedTracks } from '$lib/spotify-api';
    import { writable } from 'svelte/store';
    
    const tracksStore = writable([]);


    async function handleClick() {
        if ($tracksStore.length === 0) {
            tracksStore.set(await getUserSavedTracks($accessToken));
        };
    };
    
</script>

<h1>Welcome to Spotify Profile Viewer</h1>

{#if $profile}
    <p>Logged in as: {$profile.display_name}</p>
    <p>Email: {$profile.email}</p>
    {#if $profile.images && $profile.images.length > 0}
        <img src={$profile.images[0].url} alt="Profile media" />
    {/if}
    <TracksTable/>

{:else}
    <p>Please log in to view your profile.</p>
{/if}

