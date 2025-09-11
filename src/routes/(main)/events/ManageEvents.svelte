<script>
	import axios from "axios";
	import config from "../../config";
	import { onMount } from "svelte";
	import Calendar from "$lib/Calendar.svelte";
	import { getToastStore } from "@skeletonlabs/skeleton";
	import EventRenderer from "./EventRenderer.svelte";

    let page = 0;
    let eventID = -1;
    let events = [];
    let startDate = new Date(Date.now());
    let endDate = new Date(Date.now());
    let eventName = "";
    let eventDescription = "";
    let toastStore = getToastStore();
    function reloadThing(cb) {
        axios.get(`${config.apiEndpoint}/events`, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(res=>{
            events = res.data;
            if(cb) cb()
        })

    }
    onMount(()=>{
        reloadThing();
    })
</script>

{#if page == 0}

    <div class="flex gap-4 p-4 card">
        <button class="variant-filled-primary btn" on:click={()=>{
            startDate = new Date(Date.now());
            endDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * 3))
            page = 1;
            eventID = -1;
            eventName = "";
            eventDescription = "";
        }}>Add New</button>
    </div>
    <div class="h-4"></div>
    {#if events && events.length}
        <div class="flex gap-4 w-full flex-col">
            {#each events as event}
                <div class="card p-4 w-full">
                    <EventRenderer {event}>
                        <div class="flex gap-4 pt-4">
                            <button class="variant-filled-primary btn btn-sm" on:click={()=>{
                                eventID = event._id;
                                startDate = new Date(event.startDate);
                                endDate = new Date(event.endDate);
                                page = 1;
                                eventName = event.name;
                                eventDescription = event.description ? event.description : "";
                            }}>Manage</button>
                        </div>
                    </EventRenderer>
                </div>
            {/each}
        </div>
    {:else}
        <div class="flex p-4 items-center justify-center w-full">
            There are no events...
        </div>
    {/if}
{:else if page == 1}
    <div class="flex p-4 items-center justify-center w-full">
        <h3 class="fancy-title2 fancy-title3 h3">{eventID == -1 ? "Create Event" : "Edit Event"}</h3>
    </div>
    <h2 class="h2">Start Date</h2>
    <Calendar minDate={new Date()} bind:selected={startDate} />
    <!-- <Calendar bind:selected={startDate} /> -->
    <h2 class="h2">End Date</h2>
    <Calendar minDate={new Date(startDate.getTime() + (1000 * 60 * 60 * 24 * 3))} bind:selected={endDate} />
    <!-- <Calendar bind:selected={endDate} /> -->
    <h2>Details</h2>
    <input type="text" class="input" bind:value={eventName} placeholder="Event Name">
    <div class="h-4"></div>
    <input type="text" class="input" bind:value={eventDescription} placeholder="Event Description">
    <div class="h-4"></div>
    <button class="btn variant-filled-success" on:click={()=>{
        axios.post(`${config.apiEndpoint}/event`, {
            id: eventID,
            name: eventName,
            description: eventDescription,
            startTime: startDate.getTime(),
            endTime: endDate.getTime()
        }, {
            headers: {
                Authorization: localStorage.getItem('sessionToken')
            }
        }).then(res=>{
            if(res.data) {
                reloadThing(()=>{
                    page = 0;
                    eventID = -1;
                    toastStore.trigger({
                        message: "Created!",
                        timeout: 5000
                    })
                });

            }
        })
    }}>{eventID == -1 ? "Create" : "Save"}</button>
    {#if eventID != -1}
        <button class="variant-filled-error btn" on:click={(e)=>{
            axios.post(`${config.apiEndpoint}/event/delete/${eventID}`, {}, {
                headers: {Authorization: localStorage.getItem('sessionToken')}
            }).then(res=>{
                location.reload();
            })
        }}>Delete</button>
    {/if}
{/if}
<div class="h-4"></div>