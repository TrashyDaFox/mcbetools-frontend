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

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }

    .document-list {
        list-style: none;
        padding: 0;
    }

    .document-item {
        background: var(--color-background-secondary);
        margin: 10px 0;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
    }

    .document-item:hover {
        transform: scale(1.02);
    }

    .document-week {
        font-size: 1.2em;
        margin-bottom: 5px;
        color: var(--color-text-primary);
    }

    .document-creator {
        font-size: 0.9em;
        color: var(--color-text-secondary);
    }

    .no-documents {
        text-align: center;
        color: var(--color-text-secondary);
    }

    .remove-button {
        margin-top: 10px;
        padding: 5px 10px;
        background-color: var(--color-background-primary);
        color: var(--color-text-primary);
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .remove-button:hover {
        background-color: var(--color-background-secondary);
    }
</style>

<div class="container">
    {#if $documents.length > 0}
        <ul class="document-list">
            {#each $documents as document (document.week)}
                <li class="document-item">
                    <div class="document-week text-primary">
                        Week: {document.week} (Start Date: {getStartDateOfWeek(document.week).toLocaleDateString()})
                    </div>
                    <div class="document-creator text-secondary">Creator: {document.creator}</div>
                    <button class="remove-button" on:click={() => removeCurrentCOTW(document.creator)}>Remove This Creator</button>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="no-documents">No creators found.</p>
    {/if}
</div>