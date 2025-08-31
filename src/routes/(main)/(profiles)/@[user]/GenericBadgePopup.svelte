<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import badges from "../../../badges";

    let modalStore = getModalStore();
</script>

{#if $modalStore[0]}
    <div class="card bg-initial p-4 py-8 w-modal">
        <div class="w-full flex items-center justify-center flex-col">
            <h2 class="h2 font-bold pb-1 fancy-title2">{$modalStore[0].title}</h2>
            <p class="text-xl max-w-96">{$modalStore[0].body}</p>
            <div class="h-4"></div>
            <div class="p-4 card variant-ghost-surface w-full items-center justify-center flex relative overflow-hidden">
                <img src={badges[$modalStore[0].meta.badge].icon} alt="" class="w-48 aspect-square">
                {#if !badges[$modalStore[0].meta.badge].disableGlow}
                    <img src={badges[$modalStore[0].meta.badge].icon} alt="" class="w-48 aspect-square absolute blur-2xl opacity-75">
                {/if}
            </div>
        </div>
    </div>
{/if}