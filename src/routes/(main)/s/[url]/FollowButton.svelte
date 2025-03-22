<script lang="ts">
	import axios from "axios";
	import { getContext } from "svelte";
	import config from "../../../config";

    export let user = "";

    let loggedInUser = getContext("loggedInUser")
    let followedList = getContext("followedList") 

</script>

{#if $loggedInUser && $followedList && $loggedInUser.handle != user}
    <div class="h-4"></div>
    <button class="btn btn-sm {$followedList.includes(user) ? "variant-ghost-surface" : "variant-filled"} w-fit" on:click={()=>{
        axios.post(`${config.apiEndpoint}/follow`, {
            handle: user
        }, {headers: {Authorization: localStorage.getItem("sessionToken")}}).then(res=>{
            if(res.data.err) {
                modalStore.trigger({
                    type: 'alert',
                    title: "try again lmao",
                    body: "u cant follow urself lol"
                })
                return;
            }
            axios.get(`${config.apiEndpoint}/followed`, {headers: {Authorization: localStorage.getItem("sessionToken")}}).then(res=>{
                followedList.set(res.data)
            })
        })
    }}>
        {#if $followedList.includes(user)}
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg></span>
            <span>Followed</span>
        {:else}
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path></svg></span>
            <span>Follow</span>
        {/if}
    </button>
{/if}
