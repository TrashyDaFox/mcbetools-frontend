<script lang="ts">
	import axios from "axios";
	import config from "../../config";
	import { getContext } from "svelte";
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
	import UsersList from "./UsersList.svelte";

    let followedList = getContext("followedList")
    let followerList = getContext("followerList")

    let a = 0;
</script>
<div class="px-4 pt-4">
    <TabGroup>
        <Tab name="Reocmmendations" bind:group={a} value={0}>
            <span>Following</span>
        </Tab>
        <Tab name="Search" bind:group={a} value={1}>
            <span>My Followers</span>
        </Tab>
    </TabGroup>
    
</div>
<div class="p-4 flex flex-col gap-4">
    {#if a == 0}
        {#if $followedList.length}
            <UsersList users={$followedList} />
        {:else}
            <h3 class="h3 font-bold opacity-50">No one here yet...</h3>
        {/if}
    {:else}
            {#if $followerList.length}
            <UsersList users={$followerList} />
        {:else}
            <h3 class="h3 font-bold opacity-50">No one here yet...</h3>
        {/if}
    {/if}
</div>