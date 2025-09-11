<script lang="ts">
	import axios from "axios";
	import config from "../../config";
	import styles from "../../styles";
	import ProjectCard from "../ProjectCard.svelte";
	import { loggedInUser } from "../loggedInUserStore";

    export let event;
    let startDate = new Date(event.startDate);
    let endDate = new Date(event.endDate);
    let now = new Date();
    let status = now >= startDate && now <= endDate ? "ongoing" : now >= endDate ? "ended" : now <= startDate ? "upcoming" : "ongoing"
    let projs = {winners: [], submissions: []};
    axios.get(`${config.apiEndpoint}/event/projs/${event._id}`).then(res=>{
        projs = res.data;
    })
</script>

<div class="p-4">
    <span class="badge uppercase" class:variant-filled-success={status == "ongoing"} class:variant-filled-error={status == "ended"} class:variant-filled-warning={status == "upcoming"}>{status}</span>
    <h3 class="fancy-title2 fancy-title3 text-3xl flex gap-4">{event.name}</h3>
    <p class="opacity-75">{event.description}</p>
    <div class="h-4"></div>
    {#if status == "ongoing"}
        <div class="card variant-soft-primary p-4">
            <h3 class="h3 text-primary-500 font-bold">INFO</h3>
            <p>To submit, go to a project page, and go to "Event Submission" tab</p>
        </div>
    {/if}
    {#if status == "ended"}
        {#if projs.winners.length}
            <div class="pb-4"><h3 class="h3 font-bold">Winners</h3></div>
            <div class={styles.submissionGrid}>
                {#each projs.winners as submission}
                    <ProjectCard project={submission}>
                        {#if $loggedInUser && $loggedInUser.role >= 1}
                        <button class="variant-filled btn" on:click={(e)=>{
                            e.preventDefault();
                            let newWinners = projs.winners.map(_=>{
                                return _.url;
                            })
                            if(!newWinners.includes(submission.url)) return;
                            newWinners = newWinners.filter(_=> _ != submission.url)
                            projs.winners = projs.winners.filter(_=>_.url != submission.url);
                            axios.post(`${config.apiEndpoint}/event/set-winners/${event._id}`, {winners: newWinners}, {
                                headers: {
                                    Authorization: localStorage.getItem('sessionToken')
                                }
                            }).then(res=>{
                                axios.get(`${config.apiEndpoint}/event/projs/${event._id}`).then(res=>{
                                    projs = res.data;
                                })
                            })
                        }}>Remove winner</button>
                    {/if}

                    </ProjectCard>
                {/each}    
            </div>
        {:else}
            <div class="pb-4"><h3 class="h3 font-bold">Winners</h3></div>
            <p>No winners picked out yet</p>
        {/if}
    {/if}
    <div class="h-4"></div>
    <hr>
    <div class="h-4"></div>
    <div class="pb-4"><h3 class="h3 font-bold">Submissions</h3></div>
    <div class={styles.submissionGrid}>
        {#each projs.submissions as submission}
            {#if !projs.winners.find(_=>_.url == submission.url)}
                <ProjectCard project={submission}>
                    {#if $loggedInUser && $loggedInUser.role >= 1}
                        <button class="variant-filled btn" on:click={(e)=>{
                            e.preventDefault();
                            let newWinners = projs.winners.map(_=>{
                                return _.url;
                            })
                            if(newWinners.includes(submission.url)) return;
                            newWinners.push(submission.url)
                            projs.submissions = projs.submissions.filter(_=>_.url != submission.url);
                            axios.post(`${config.apiEndpoint}/event/set-winners/${event._id}`, {winners: newWinners}, {
                                headers: {
                                    Authorization: localStorage.getItem('sessionToken')
                                }
                            }).then(res=>{
                                axios.get(`${config.apiEndpoint}/event/projs/${event._id}`).then(res=>{
                                    projs = res.data;
                                })
                            })
                        }}>Make winner</button>
                    {/if}
                </ProjectCard>
            {/if}
        {/each}    
    </div>
</div>