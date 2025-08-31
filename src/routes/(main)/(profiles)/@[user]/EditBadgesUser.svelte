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
    <div class="card p-4 flex max-w-[900px] w-full flex-wrap gap-4 overflow-auto max-h-[500px]">
        <div class="w-full card p-4 variant-ghost-primary">
            <h3 class="text-primary-500 font-bold text-lg">NOTE</h3>
            <p>This is just pride flag badges for now.</p>
            <p>If you have any ideas for extra optional badges to put here, please message an admin</p>
        </div>
        {#each Object.keys(badges).filter(_=>badges[_].selectable) as badge}
            <div class="flex flex-auto btn card-hover cursor-pointer gap-4 items-center p-4 flex-col" class:variant-ghost-primary={badgesCurrent.includes(badge)} class:variant-filled-surface={!badgesCurrent.includes(badge)} on:click={()=>{
                let checked = badgesCurrent.includes(badge)
                if (checked) {
        badgesCurrent = badgesCurrent.filter(b => b !== badge);
    } else {
        badgesCurrent = [...badgesCurrent, badge];
    }
                axios.post(`${config.apiEndpoint}/select-badges`, {badges: badgesCurrent.join(',')}, {
                    headers: {
                        Authorization: localStorage.getItem("sessionToken")
                    }
                }).then(res=>{
                    if($modalStore[0].response) $modalStore[0].response(badgesCurrent)
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