<script>
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
	import { loggedInUser } from "../loggedInUserStore";
	import ManageEvents from "./ManageEvents.svelte";
	import axios from "axios";
	import { onMount } from "svelte";
	import config from "../../config";
	import EventsPage from "./EventsPage.svelte";
	import EventView from "./EventView.svelte";
    let tab = 0;
    let eventID = -1;
    let events = [];
    onMount(()=>{
        axios.get(`${config.apiEndpoint}/events`, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(res=>{
            events = res.data;
        })
    })
</script>
<TabGroup>
    <Tab name="curr" value={0} bind:group={tab}>Current Events</Tab>
    <Tab name="up" value={1} bind:group={tab}>Upcoming Events</Tab>
    <Tab name="ended" value={2} bind:group={tab}>Ended Events</Tab>
    {#if $loggedInUser && $loggedInUser.role >= 1}
        <Tab name="ended" value={3} bind:group={tab}>Manage Events <span class="badge variant-filled-warning">MOD</span></Tab>
    {/if}
    {#if tab == 4}
    <Tab name="event" value={4} bind:group={tab}>{events.find(_=>_._id == eventID) ? `Event: ${events.find(_=>_._id == eventID).name}` : "Event"}</Tab>

    {/if}
</TabGroup>
<div class="h-4"></div>
<div class="px-4">
    {#if tab == 3}
        <ManageEvents />
    {:else if tab == 0}
        <EventsPage events={events.filter(_=>new Date(_.endDate) >= new Date() && new Date(_.startDate) <= new Date())} on:use={(e)=>{
            tab = 4;
            eventID = e.detail;
        }} />
    {:else if tab == 1}
        <EventsPage events={events.filter(_=>new Date(_.startDate) >= new Date())} on:use={(e)=>{
            tab = 4;
            eventID = e.detail;
        }}/>
    {:else if tab == 2}
        <EventsPage events={events.filter(_=>new Date(_.endDate) <= new Date())} on:use={(e)=>{
            tab = 4;
            eventID = e.detail;
        }} />
    {:else if tab == 4}
        <EventView event={events.find(_=>_._id == eventID)} />
    {/if}
</div>