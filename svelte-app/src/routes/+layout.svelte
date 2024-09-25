<script>
    import { onMount } from 'svelte';
    import { profile, accessToken, initializeProfile, initializeAccessToken } from '$lib/stores';

    onMount(() => {
        initializeProfile();
        console.log("Profile", $profile);
        initializeAccessToken();
        console.log("Access Token", $accessToken);
    });

</script>
<div style="display:flex; flex-direction:column; padding: 0 10%; align-items:center;">
    <nav>
        <a href="/">Home</a>
        {#if !$profile}
        <a href="/login">Login with Spotify</a>
        {/if}
    </nav>
    {#if $profile}
        <span>Welcome, {$profile.display_name}</span>
    {/if}
    <slot />
</div>
