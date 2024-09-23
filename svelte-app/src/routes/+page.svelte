<script>
    import { profile, accessToken } from '$lib/stores';
    import { getUserSavedTracks } from '$lib/spotify-api';
    
    let tracks = [];

    function handleClick() {
        tracks = getUserSavedTracks($accessToken);
    };
    
</script>

<h1>Welcome to Spotify Profile Viewer</h1>

{#if $profile}
    <p>Logged in as: {$profile.display_name}</p>
    <p>Email: {$profile.email}</p>
    {#if $profile.images && $profile.images.length > 0}
        <img src={$profile.images[0].url} alt="Profile media" />
    {/if}

    {#if $accessToken} <button on:click={handleClick}>Fetch Tracks</button> {/if}
{:else}
    <p>Please log in to view your profile.</p>
{/if}

