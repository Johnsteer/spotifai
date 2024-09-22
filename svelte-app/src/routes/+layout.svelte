<script>
    import { onMount } from 'svelte';
    import { profile, initializeProfile } from '$lib/stores';

    onMount(() => {
        initializeProfile();
    });
</script>

<nav>
    <a href="/">Home</a>
    {#if $profile}
        <span>Welcome, {$profile.display_name}</span>
    {:else}
        <a href="/login">Login with Spotify</a>
    {/if}
</nav>

<slot />