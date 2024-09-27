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
<div class="container">
    <div class="nav">
        <nav>
            <a href="/">Root</a>
            <a href="/home">Home</a>
            {#if !$profile}
            <a href="/login">Login with Spotify</a>
            {/if}
        </nav>
        {#if $profile}
            <span>Welcome, {$profile.display_name}</span>
        {/if}
    </div>

    <slot />
</div>

<style>

    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 80%;
        margin: 0 auto;
        align-items: center;
        justify-content: top;
        background-color: #90EE90;
    }

    .nav {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 100%;
        background-color: aqua;
    }
</style>