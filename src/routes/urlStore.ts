// urlStore.js
import { writable } from 'svelte/store';

function createUrlStore() {
    const { subscribe, set } = writable(window.location.href);

    function updateUrl() {
        set(window.location.href);
    }

    window.addEventListener('popstate', updateUrl);

    return {
        subscribe,
        updateUrl
    };
}

export const urlStore = createUrlStore;
