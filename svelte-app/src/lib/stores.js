import { writable } from 'svelte/store';
import { browser } from '$app/environment';


// Create a writable store for the user profile
const createProfileStore = () => {
    const { subscribe, set, update } = writable(null);

    return {
        subscribe,
        // add to set() method functionality to write to local storage if in browser
        set: (profile) => {
            set(profile);
            if (browser) {
                localStorage.setItem('spotifyProfile', JSON.stringify(profile));
            }
        },
        update,
        // add clear method for reseting store and localstorage if in browser 
        clear: () => {
            set(null);
            if (browser) {
                localStorage.removeItem('spotifyProfile');
            }
        }
    };
};



export const profile = createProfileStore();

// Function to initialize the profile from localStorage
export function initializeProfile() {
    if (browser) {
        const storedProfile = localStorage.getItem('spotifyProfile');
        if (storedProfile) {
            profile.set(JSON.parse(storedProfile));
        }
    }
}