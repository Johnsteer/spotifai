<script>
    import { userSavedTracks } from '$lib/stores';
</script>

{#if $userSavedTracks.length !== 0 }
    <table>
        <tr>
        <th>Artist</th>
        <th>Track</th>
        </tr>
        {#each $userSavedTracks as track }
            <tr>
                <td>
                    <a href={track.artistHref}>{track.artistName}</a>
                </td>
                <td>
                    <a href={track.trackHref}>{track.trackName}</a>
                </td>
            </tr>
        {/each}
    </table>
{:else}
    No Track Data
{/if}