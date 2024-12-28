<script>
    import axios from "axios";
    import { writable } from "svelte/store";
    import config from "../../config";
    import { onMount } from 'svelte';

    let documents = writable([]);

    onMount(() => {
        axios.get(`${config.apiEndpoint}/cotw-list`)
            .then(res => {
                documents.set(res.data);
            })
            .catch(error => {
                console.error("Error fetching documents:", error);
            });
    });

    function getStartDateOfWeek(weeksSince1970) {
        const millisecondsPerWeek = 604800000;
        const startDate = new Date(1969, 11, 30);
        startDate.setTime(startDate.getTime() + weeksSince1970 * millisecondsPerWeek);
        return startDate;
    }

    function removeCurrentCOTW(creator) {
        axios({
            method: "POST",
            url: `${config.apiEndpoint}/owner/remove-cotw`,
            data: { user: creator }
        }).then(res => {
            documents.update(docs => docs.filter(doc => doc.creator !== creator));
        }).catch(error => {
            console.error("Error removing COTW:", error);
        });
    }
</script>

<div class="container mx-auto p-4">
    {#if $documents.length > 0}
        <ul class="list-none p-0">
            {#each $documents as document (document.week)}
                <li class="bg-secondary m-2 p-4 rounded shadow transition-transform hover:scale-105">
                    <div class="text-primary-500 text-lg mb-2">
                        Week: {document.week} (Start Date: {getStartDateOfWeek(document.week).toLocaleDateString()})
                    </div>
                    <div class="text-secondary text-sm">Creator: {document.creator}</div>
                    <button class="mt-2 p-2 bg-gray-50 text-gray-500 rounded cursor-pointer hover:bg-gray-500 hover:text-gray-50" on:click={() => removeCurrentCOTW(document.creator)}>Remove This Creator</button>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="text-center text-secondary">No creators found.</p>
    {/if}
</div>