<script lang="ts">
	import axios from "axios";
	import config from "../../config";
    let animate = false;
    let isPaused = true;
    let audioElem = null;
    let clicks = 0;
    let playing = true;
    let yuh = null;
    let text = "Click the goober :3";
</script>
<svelte:head>
    <meta property="og:title" content="le silly goober :3">
    <meta property="og:description" content="you like kissing boys dont you?">
    <meta property="og:image" content="https://mcbetools.trashdev.org/dicoRAD.gif">
    <meta property="og:url" content="https://mcbetools.trashdev.org/boykisser">
    <meta property="og:type" content="website">
</svelte:head>
<style>
    .css-selector {
    /* background: linear-gradient(317deg, #ffa2ef, #4bdeff, #ffffff);
    background-size: 600% 600%;

    -webkit-animation: AnimationName 11s ease infinite;
    -moz-animation: AnimationName 11s ease infinite;
    animation: AnimationName 11s ease infinite; */
    background: url(/thesillyroom.webp);
    background-size: cover;
    background-position: center;
}

@-webkit-keyframes AnimationName {
    0%{background-position:37% 0%}
    50%{background-position:64% 100%}
    100%{background-position:37% 0%}
}
@-moz-keyframes AnimationName {
    0%{background-position:37% 0%}
    50%{background-position:64% 100%}
    100%{background-position:37% 0%}
}
@keyframes AnimationName {
    0%{background-position:37% 0%}
    50%{background-position:64% 100%}
    100%{background-position:37% 0%}
}
</style>
{#if playing}
    <audio src="/boykissersilly.mp3" bind:paused={isPaused}></audio>
    <div class="w-full h-full bg-red-500 css-selector flex items-center justify-center flex-col gap-2">
        <div class="flex items-center justify-center flex-col gap-2 w-full h-full backdrop-blur-sm">
            <h1 class="h3 font-bold text-white">{clicks} clicks :3</h1>
            <audio src="/eek.ogg" loop bind:this={yuh}></audio>
            <img src={!animate ? "dicoRAD_static.gif" : "/dicoRAD_edit.gif"} class="rounded-lg shadow-xl cursor-pointer" alt="" on:click={()=>{
                yuh.play()
                if(isPaused) {
                    clicks++;
                    animate = true;
                    setTimeout(()=>{
                        animate = false;
                    }, 0.45 * 1000)
                }
                isPaused = false;
                if(clicks >= 10) {
                    if(localStorage.getItem("sessionToken")) {
                        let body = new FormData();
                        body.append("bio", "I love kissing boys :3")
                        axios({
                            url: `${config.apiEndpoint}/update-bio`,
                            method: "POST",
                            data: body,
                            headers: {
                                Authorization: localStorage.getItem("sessionToken")
                            }
                        }).then(res=>{
                            text = "i changed ur bio hope u dont mind"
                        })
                    } else {
                        text = "damn ur not logged in :("
                    }
                }
            }}>
            <p class="h3 font-bold text-white">{text}</p>
    
        </div>
    </div>
{:else}
    <div class="w-full h-full w-full h-full flex items-center justify-center">
        <button class="btn variant-filled-primary">Play da silly</button>
    </div>
{/if}