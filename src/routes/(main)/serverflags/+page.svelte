<script lang="ts">
	import axios from "axios";
	import { writable } from "svelte/store";
	import config from "../../config";
	import { getToastStore, SlideToggle } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";

    let flags = writable([]);
    onMount(()=>{
        axios.get(`${config.apiEndpoint}/flags`, {
            headers: {
                Authorization: localStorage.getItem("sessionToken")
            }
        }).then(res=>{
            flags.set(res.data);
        })

    })
    let toastStore = getToastStore();
</script>

<div class="flex flex-col gap-4 p-4">
    {#each $flags as flag}
        <SlideToggle name={flag} checked={flag.val} size="sm" active="bg-primary-500" background="bg-surface-400" on:change={(e)=>{
            // alert(`${e.target.checked ? "CHECKED" : "NOT"}`)
            axios.post(`${config.apiEndpoint}/flags/set/${flag.key}/${e.target.checked ? "true" : "false"}`, {}, {
                headers: {
                    Authorization: localStorage.getItem('sessionToken')
                }
            }).then(res=>{
                if(res.data == "SUC") {
                    toastStore.trigger({
                        background: 'variant-filled-success',
                        timeout: 5000,
                        message: "Successfully changed flag"
                    })
                } else {
                    toastStore.trigger({
                        background: 'variant-filled-error',
                        timeout: 5000,
                        message: "Could not change flag"
                    })
                }
            }).catch(e=>{
                toastStore.trigger({
                    background: 'variant-filled-error',
                    timeout: 5000,
                    message: "An unknown error occurred"
                })
            })
        }}>{flag.key}</SlideToggle>
    {/each}
</div>