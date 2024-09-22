<script>
    import { profile } from '$lib/stores';
</script>

<h1>Welcome to Spotify Profile Viewer</h1>

{#if $profile}
    <p>Logged in as: {$profile.display_name}</p>
    <p>Email: {$profile.email}</p>
    {#if $profile.images && $profile.images.length > 0}
        <img src={$profile.images[0].url} alt="Profile media" />
    {/if}
{:else}
    <p>Please log in to view your profile.</p>
{/if}