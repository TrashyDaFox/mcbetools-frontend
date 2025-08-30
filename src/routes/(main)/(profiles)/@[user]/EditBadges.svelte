<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import badges from "../../../badges";
	import axios from "axios";
	import config from "../../../config";

    const modalStore = getModalStore()

    $: badgesCurrent = $modalStore[0]?.meta.badges ?? [];

    // $: badgesCurrent {

    // }
</script>

{#if $modalStore[0]}
    <div class="card p-4 grid grid-cols-4 gap-4 overflow-auto max-h-[500px]">
        {#each Object.keys(badges) as badge}
            <div class="flex btn card-hover cursor-pointer gap-4 items-center p-4 flex-col" class:variant-ghost-primary={badgesCurrent.includes(badge)} class:variant-filled-surface={!badgesCurrent.includes(badge)} on:click={()=>{
                let checked = badgesCurrent.includes(badge)
                if (checked) {
        badgesCurrent = badgesCurrent.filter(b => b !== badge);
    } else {
        badgesCurrent = [...badgesCurrent, badge];
    }
                axios.post(`${config.apiEndpoint}/update-badges`, {user: $modalStore[0].meta.user, badges: badgesCurrent}, {
                    headers: {
                        Authorization: localStorage.getItem("sessionToken")
                    }
                }).then(res=>{
                })

        }}>
                <div class="flex gap-4">
                    <img src={badges[badge].icon} alt="" class="w-8 h-8" style="image-rendering: pixelated;">
                    <!-- <p>{badgesCurrent.includes(badge)}</p> -->
                    <!-- <input class="checkbox" type="checkbox" name="" id="" checked={badgesCurrent.includes(badge)} on:change={(e)=>{
                        const checked = e.target.checked;
                    }}>     -->
                </div>
                <p>{badges[badge].displayName}</p>
            </div>
        {/each}
    </div>
{/if}