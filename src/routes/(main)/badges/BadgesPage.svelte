<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import badges from "../../badges";
	import styles from "../../styles";
	import GenericBadgePopup from "../(profiles)/@[user]/GenericBadgePopup.svelte";

    let modalStore = getModalStore()
</script>
<div class="p-4">
    <div class={styles.submissionGrid}>
        {#each Object.keys(badges) as badge}
            <div class="card w-full p-4 card-hover hover:variant-filled-surface cursor-pointer" on:click={()=>{
                                        if(badges[badge].component) {
                                            modalStore.trigger({
                                                type: 'component',
                                                component: {ref: badges[badge].component},
                                                meta: {profileData: null, badge}
                                            })
                                        } else {
                                            modalStore.trigger({
                                                type: 'component',
                                                title: `${badges[badge].displayName}`,
                                                body: `${badges[badge].description ? badges[badge].description : "No Description"}`,
                                                component: {ref: GenericBadgePopup},
                                                meta: {badge}
                                            })
                                        }

            }}>
                <div class="w-full flex gap-4 h-full items-center p-4">
                    <img src={badges[badge].icon} class="w-12 h-12" style="image-rendering: pixelated;" alt="">
                    <div class="flex gap-1 flex-col">
                        <p class="font-bold text-lg">{badges[badge].displayName}</p>
                        <p class="opacity-50">{badges[badge].description ? badges[badge].description : "No description"}</p>
                    </div>
                </div>
            </div>
        {/each}
    </div>

</div>