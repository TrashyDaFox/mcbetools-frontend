<script>
    import axios from "axios";
    import { writable } from "svelte/store";
    import config from "../../config";
    import { onMount } from 'svelte';
	import CotwRenderer from "./COTWRenderer.svelte";
	import { loggedInUser } from "../loggedInUserStore";

    let documents = writable([]);
    let curr = writable(null);
    function weeksSinceEpoch(timestamp) {
    // Number of milliseconds in one week
    const MS_IN_A_WEEK = 604800000;
  
    // Calculate the difference between the current timestamp and the epoch timestamp
    const timeDifference = timestamp - 0; // 0 is the Unix Epoch (January 1, 1970 00:00:00 UTC)
  
    // Convert milliseconds difference to weeks and return it
    return Math.floor(timeDifference / MS_IN_A_WEEK);
}  

    onMount(() => {
        axios.get(`${config.apiEndpoint}/cotw-list`, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        })
            .then(res => {
                if(res.data === 'fuck off') document.location.href = '/'
                // if(res.data === 'fuck off') document.location.href = '/'
                documents.set(res.data);
                console.log(res.data);
                const newWeek = weeksSinceEpoch(Date.now());
                let newest = res.data.filter(d => d.week <= newWeek).sort((a, b) => b.week - a.week);
                curr.set(newest[0].creator)
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

{#if !$loggedInUser || $loggedInUser.role < 3}
    <div class="p-4">
        <div class="card variant-soft-warning p-4">
            <h3 class="h3 font-bold text-warning-500">WARNING</h3>
            <p>You dont have a high enough role, so this page is readonly!</p>
        </div>
    </div>
{/if}

<div class="container mx-auto p-4">
    {#if $curr}
        <div class="flex items-center justify-center px-4 pb-4">
            <h3 class="h3 font-bold fancy-title2 fancy-title3">Current Creator</h3>
        </div>

        <div class="">
            <div class="flex">
                <CotwRenderer handle={$curr} hideRemoveBtn={true} />
            </div>
        </div>
    {/if}
    {#if $documents.length > 0}
        <div class="flex items-center justify-center px-4 py-4">
            <h3 class="h3 font-bold fancy-title2 fancy-title3">All Creators</h3>
        </div>
        <ul class="grid grid-cols-2 gap-4">
            {#each $documents as document (document.week)}
                <CotwRenderer handle={document.creator} on:remove={(e)=>{
                    removeCurrentCOTW(document.creator)
                }}>
                    <svelte:fragment slot="subtext">
                        <span class="p-4 badge variant-glass-surface px-32">
                            <span class="badge variant-filled-primary mr-2">Week</span> {document.week} <span class="badge variant-filled-secondary mr-2">Start Date</span> <span class="w-[1px]"></span> {getStartDateFromWeekNumber(document.week).toLocaleDateString()}
                        </span>
                    </svelte:fragment>
                </CotwRenderer>
                <!-- <li class="document-item p-4 card">
                    <div class="document-week text-primary">
                        Week: {document.week} (Start Date: {getStartDateFromWeekNumber(document.week).toLocaleDateString()})
                    </div>
                    <div class="document-creator text-secondary">Creator: <a href="/@{document.creator}" class="anchor">@{document.creator}</a></div>
                    <button class="btn variant-soft-primary" on:click={() => removeCurrentCOTW(document.creator)}>Remove This Creator</button>
                </li> -->
            {/each}
        </ul>
    {:else}
        <p class="text-center text-secondary">No creators found.</p>
    {/if}
</div>