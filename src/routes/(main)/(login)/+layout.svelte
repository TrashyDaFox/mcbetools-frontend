<script lang="ts">

	import axios from "axios";
	import config from "../../config";
	import { getToastStore, initializeStores, Toast } from "@skeletonlabs/skeleton";
	import styles from "../../styles";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import ProjectCard from "../ProjectCard.svelte";
    initializeStores();
    const toastStore = getToastStore();
    let email = "";
    let password = "";
    let totptoken = "";
    let mfaScreen = false;
    let recentProjects = writable([]);
    
    onMount(()=>{
        function updateZoomFix() {
  document.documentElement.style.setProperty('--zoom', window.devicePixelRatio);
}
updateZoomFix();
window.addEventListener('resize', updateZoomFix);
        axios.get(`${config.apiEndpoint}/get-recent-projects2`, {
            headers: {
                Authorization: "asidhiu9fhwei"
            }
        }).then((res) => {
            recentProjects.set(res.data);
        });
    });

</script>
<style lang="text/postcss">
    @keyframes hero-gradient-animation {
        0% {
            --c-0: hsla(265, 73%, 45%, 1);
            --x-0: 13%;
            --y-0: 16%;
            --s-start-0: 9%;
            --s-end-0: 58.89119889119889%;
            --s-start-1: 9%;
            --s-end-1: 58.89119889119889%;
            --y-1: 89%;
            --c-1: hsla(345, 88%, 31%, 0.91);
            --x-1: 14%;
            --y-2: 23%;
            --x-2: 23%;
            --s-start-2: 2%;
            --s-end-2: 60%;
            --c-2: hsla(264, 73%, 3%, 1);
        }
    
        100% {
            --c-0: hsla(260, 85%, 32%, 1);
            --x-0: 95%;
            --y-0: 18%;
            --s-start-0: 4%;
            --s-end-0: 60%;
            --s-start-1: 4.5991935069083505%;
            --s-end-1: 60%;
            --y-1: 47%;
            --c-1: hsla(292.99999999999994, 68%, 43%, 1);
            --x-1: 97%;
            --y-2: 91%;
            --x-2: 92%;
            --s-start-2: 4%;
            --s-end-2: 73%;
            --c-2: hsla(27.79411764705882, 87%, 37%, 1);
        }
    }
    
    @property --c-0 {
        syntax: '<color>';
        inherits: false;
        initial-value: hsla(265, 73%, 45%, 1)
    }
    
    @property --x-0 {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 13%
    }
    
    @property --y-0 {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 16%
    }
    
    @property --s-start-0 {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 9%
    }
    
    @property --s-end-0 {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 58.89119889119889%
    }
    
    @property --s-start-1 {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 9%
    }
    
    @property --s-end-1 {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 58.89119889119889%
    }
    
    @property --y-1 {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 89%
    }
    
    @property --c-1 {
        syntax: '<color>';
        inherits: false;
        initial-value: hsla(345, 88%, 31%, 0.91)
    }
    
    @property --x-1 {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 14%
    }
    
    @property --y-2 {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 23%
    }
    
    @property --x-2 {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 23%
    }
    
    @property --s-start-2 {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 2%
    }
    
    @property --s-end-2 {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 60%
    }
    
    @property --c-2 {
        syntax: '<color>';
        inherits: false;
        initial-value: hsla(264, 73%, 3%, 1)
    }
    
    .your_css_selector_here {
        --c-0: hsla(265, 73%, 45%, 1);
        --x-0: 13%;
        --y-0: 16%;
        --y-1: 89%;
        --c-1: hsla(345, 88%, 31%, 0.91);
        --x-1: 14%;
        --y-2: 23%;
        --x-2: 23%;
        --c-2: hsla(264, 73%, 3%, 1);
        ;
        background-color: hsla(272, 86%, 9%, 1);
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1288 1288' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"), radial-gradient(circle at var(--x-0) var(--y-0), var(--c-0) var(--s-start-0), transparent var(--s-end-0)), radial-gradient(circle at var(--x-1) var(--y-1), var(--c-1) var(--s-start-1), transparent var(--s-end-1)), radial-gradient(circle at var(--x-2) var(--y-2), var(--c-2) var(--s-start-2), transparent var(--s-end-2));
        animation: hero-gradient-animation 2s linear infinite alternate;
        background-blend-mode: overlay, overlay, normal, normal;
    }
    @keyframes scrolly {
      0% {
        transform: rotateX(60deg) rotateZ(45deg) translateY(0px);
      }
      100% {
        transform: rotateX(60deg) rotateZ(45deg) translateY(-100px);
      }
    }
    @keyframes diagonal-scroll {
      0% {
        transform: rotateX(60deg) rotateZ(45deg) translate(0, 0);
      }
      100% {
        transform: rotateX(60deg) rotateZ(45deg) translate(-1500px, -1500px); /* Diagonal movement */
      }
    }
    .grid-container {
      /* animation: diagonal-scroll 30s linear infinite; */
      position: absolute;
      top: 0;
      left: 0;
      width: 100%; /* Ensure it's full-width */
      height: 100%; /* Ensure it's full-height */
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)) !important; /* Auto fill grid with responsive columns */
      grid-template-rows: repeat(auto-fill, 600px) !important; /* Ensure rows are also dynamic */
    
    }
    </style>
<!-- style="background:url(/loginbg.png);background-size:cover;background-position:center;" -->
<div class="container h-full h-full flex justify-center items-center p-0 max-w-none">
	<div
		class="bg w-full h-full flex justify-center items-center relative"
    >
    <div class="absolute left-0 top-0 w-full h-full overflow-hidden -z-10 flex items-center justify-center bg-surface-900"
      style="transform: scale(1.5); transform-origin: bottom left;">
      {#if $recentProjects && $recentProjects.length}
        <div class="grid-container w-max h-max" style="display: grid; perspective: 800px; gap: 24px; grid-template-columns: repeat(5, minmax(540px, 1fr)); transform: rotateX(60deg) rotateZ(45deg); transform-style: preserve-3d;">
          {#each $recentProjects as proj}
            <ProjectCard project={proj} extraStyles="width: 100% !important; height: 600px; opacity: 0.6;" extraClasses="!shadow-xl" />
          {/each}
        </div>
      {/if}
    </div>
    <div class="w-full h-full flex justify-center items-center backdrop-blur-sm bg-gradient-to-b from-surface-900/10 to-surface-900 flex-col gap-4">
        <slot />
    </div>
    </div>
</div>

<span class="fixed z-100 right-10 bottom-10">
    <span class="text-white/50">
        Website made with &lt;3 by <a href="https://bsky.app/profile/trashdev.org" class="text-white hover:underline">Trashy</a> and <a href="https://bsky.app/profile/fruitkitty.xyz" class="text-white hover:underline">FruitKitty</a>
    </span>
</span>