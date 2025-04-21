<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import badges from "../../../badges";
	import axios from "axios";
	import config from "../../../config";

    const modalStore = getModalStore()

    const badgesCurrent = $modalStore[0].meta.badges;
</script>

{#if $modalStore[0]}
    <div class="card p-4 grid grid-cols-4 gap-4 overflow-auto max-h-[500px]">
        {#each Object.keys(badges) as badge}
            <div class="flex card gap-4 items-center variant-filled-surface p-4 flex-col">
                <div class="flex gap-4">
                    <img src={badges[badge].icon} alt="" class="w-8 h-8">
                    <input class="checkbox" type="checkbox" name="" id="" checked={badgesCurrent.includes(badge)} on:change={(e)=>{
                        const checked = e.target.checked;
                        if(checked) {
                            if(!badgesCurrent.includes(badge)) {
                                badgesCurrent.push(badge)
                            }
                        } else {
                            if(badgesCurrent.indexOf(badge) > -1) {
                                badgesCurrent.splice(badgesCurrent.indexOf(badge), 1)
                            }
                        }
                        axios.post(`${config.apiEndpoint}/update-badges`, {user: $modalStore[0].meta.user, badges: badgesCurrent}, {
                            headers: {
                                Authorization: localStorage.getItem("sessionToken")
                            }
                        }).then(res=>{
                        })
                    }}>    
                </div>
                <p>{badges[badge].displayName}</p>
            </div>
        {/each}
    </div>
{/if}