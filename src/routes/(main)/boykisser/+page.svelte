<script lang="ts">
    let isPaused = true;
    let audioElem = null;
    let clicks = 0;
</script>
<svelte:head>
    <meta property="og:title" content="le silly goober :3">
    <meta property="og:description" content=":3">
    <meta property="og:image" content="https://mcbetools.trashdev.org/dicoRAD.gif">
    <meta property="og:url" content="https://mcbetools.trashdev.org/boykisser">
    <meta property="og:type" content="website">
</svelte:head>
<style>
    .css-selector {
    background: linear-gradient(317deg, #ffa2ef, #4bdeff, #ffffff);
    background-size: 600% 600%;

    -webkit-animation: AnimationName 11s ease infinite;
    -moz-animation: AnimationName 11s ease infinite;
    animation: AnimationName 11s ease infinite;
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
<audio src="/boykissersilly.mp3" bind:paused={isPaused}></audio>
<div class="w-full h-full bg-red-500 css-selector flex items-center justify-center flex-col">
    <h1 class="h3 font-bold text-black">{clicks} clicks :3</h1>
    <img src={isPaused ? "dicoRAD_static.gif" : "/dicoRAD_edit.gif"} class="rounded-lg shadow-xl cursor-pointer" alt="" on:click={()=>{
        if(isPaused) {
            clicks++;
        }
        isPaused = false;
    }}>
    <p class="h3 font-bold text-black">Click the goober :3</p>
</div>