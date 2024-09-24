<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { profile, accessToken } from '$lib/stores';

    export let data;

    onMount(() => {
        if (data.profile) {
            profile.set(data.profile);
            accessToken.set(data.accessToken);
            goto('/');
        } else {
            goto('/');
        }
    });
</script>

<p>Processing login...</p>