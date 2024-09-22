<script>
    import { onMount } from 'svelte';
  
    let clientId = '';
    let isAuthenticated = false;
    let profile = null;
    let error = null;
    let authCheckComplete = false;  // New state variable

    const REDIRECT_URI = 'http://localhost:5173/'; // Update this to match your app's URL
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';
  
    function login() {
      if (!clientId) {
        error = 'Please enter a Client ID';
        return;
      }
      error = null;
      window.location.href = `${AUTH_ENDPOINT}?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-private%20user-read-email`;
    }
  
    async function fetchProfile(token) {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return await response.json();
    }
  
    onMount(() => {
      const hash = window.location.hash;
      if (hash) {
        const token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'))?.split('=')[1];
        
        if (token) {
          isAuthenticated = true;
          fetchProfile(token).then(data => {
            profile = data;
          }).catch(err => {
            error = 'Failed to fetch profile data';
            console.error(err);
          }).finally(() => {
            authCheckComplete = true;  // Set to true when auth check is complete
          });
        } else {
          authCheckComplete = true;  // Set to true if no token found
        }
      } else {
        authCheckComplete = true;  // Set to true if no hash found
      }
    });
    // Remove or comment out this line as it's not needed
    // console.log(!isAuthenticated);
  </script>
  
  <main>
    <h1>Spotify Profile Data</h1>
    {#if authCheckComplete}  <!-- Only render content when auth check is complete -->
      {#if !isAuthenticated}
        <div>
          <label for="clientId">Spotify Client ID:</label>
          <input type="text" id="clientId" bind:value={clientId} placeholder="Enter your Spotify Client ID">
        </div>
        <button on:click={login}>Login with Spotify</button>
        {#if error}
          <p class="error">{error}</p>
        {/if}
      {:else if profile}
        <h2>Welcome, {profile.display_name}!</h2>
        <p>Email: {profile.email}</p>
        {#if profile.images && profile.images.length > 0}
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img src={profile.images[0].url} alt="Profile Picture" />
        {/if}
      {:else}
        <p>Loading profile data...</p>
      {/if}
    {:else}
      <p>Checking authentication...</p>
    {/if}
  </main>
  
  <style>
    main {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }
  
    div {
      margin-bottom: 15px;
    }
  
    label {
      display: block;
      margin-bottom: 5px;
    }
  
    input {
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
    }
  
    button {
      padding: 10px 20px;
      background-color: #1DB954;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }
  
    img {
      max-width: 100px;
      border-radius: 50%;
      margin-top: 20px;
    }
  
    .error {
      color: red;
      margin-top: 10px;
    }
  </style>