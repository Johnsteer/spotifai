<script>
    import { profile, accessToken, userSavedTracks } from '$lib/stores';
    import TracksTable from '$lib/components/TracksTable.svelte';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    export let data;
    console.log("1", data.savedTracks[0])
    userSavedTracks.set(data.savedTracks)

    console.log("2", get(userSavedTracks))

</script>

<h1>Homepage</h1>
{#if $userSavedTracks}
    <TracksTable /> 
{:else}    
    Nothing
{/if}


