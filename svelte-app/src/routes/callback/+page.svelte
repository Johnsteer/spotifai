<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { profile } from '$lib/stores';

    export let data;

    onMount(() => {
        if (data.profile) {
            profile.set(data.profile);
            goto('/');
        } else {
            goto('/login');
        }
    });
</script>

<p>Processing login...</p>