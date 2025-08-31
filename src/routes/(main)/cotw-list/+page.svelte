<script>
    import axios from "axios";
    import { writable } from "svelte/store";
    import config from "../../config";
    import { onMount } from 'svelte';

    let documents = writable([]);

    onMount(() => {
        axios.get(`${config.apiEndpoint}/cotw-list`)
            .then(res => {
                if(res.data === 'fuck off') document.location.href = '/'
                // if(res.data === 'fuck off') document.location.href = '/'
                documents.set(res.data);
            })
    });

    // function getStartOfWeek(date, weekStartsOn = 0) {
    //     // weekStartsOn = 0 for Sunday, 1 for Monday
    //     const d = new Date(date);
    //     const day = d.getDay();
    //     const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
        
    //     d.setDate(d.getDate() - diff);
    //     d.setHours(0, 0, 0, 0); // midnight
    //     return d;
    // }
    function getStartDateFromWeekNumber(weekNumber) {
        const epoch = new Date(1970, 0, 1); // Jan 1 1970
        return new Date(epoch.getTime() + weekNumber * 7 * 24 * 60 * 60 * 1000);
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
                <li class="document-item">
                    <div class="document-week text-primary">
                        Week: {document.week} (Start Date: {getStartDateFromWeekNumber(document.week).toLocaleDateString()})
                    </div>
                    <div class="document-creator text-secondary">Creator: {document.creator}</div>
                    <button class="btn variant-filled-primary" on:click={() => removeCurrentCOTW(document.creator)}>Remove This Creator</button>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="text-center text-secondary">No creators found.</p>
    {/if}
</div>