<script>
	import { getModalStore } from "@skeletonlabs/skeleton";
	import badges from "../../../../badges";
    
    let modalStore = getModalStore()
</script>

<style>
    .trans-flag {
        background: linear-gradient(
  to bottom,
  #a5c7f0 0%,
  #a5c7f0 20%,
  #f4a5c7 20%,
  #f4a5c7 40%,
  #fefefe 40%,
  #fefefe 60%,
  #f4a5c7 60%,
  #f4a5c7 80%,
  #a5c7f0 80%,
  #a5c7f0 100%
);

    }
    .gay-text {
  background: linear-gradient(
    to right,
    #f8a5c2,  /* pastel red */
    #fbc2a9,  /* pastel orange */
    #faf6a3,  /* pastel yellow */
    #b0f6c1,  /* pastel green */
    #a5c7f0,  /* pastel blue */
    #d3a5f7   /* pastel purple */
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

</style>

{#if $modalStore[0]}
    <div class="card bg-initial p-4 text-center">
        <div class="flex w-full items-center justify-center">
            <h1 class="h2 font-bold gay-text w-fit text-center">{badges[$modalStore[0].meta.badge].displayName}</h1>
        </div>
        <p class="max-w-96">{badges[$modalStore[0].meta.badge].description}. You can get this badge by messaging <a class="anchor" data-sveltekit-reload={true} href="/@trashy">@trashy</a></p>
        <div class="w-96 h-96 flex items-center justify-center">
            <img src={badges[$modalStore[0].meta.badge].icon} alt="" class="w-[90%] h-[90%]" style="image-rendering: pixelated;">
        </div>
    </div>
{/if}