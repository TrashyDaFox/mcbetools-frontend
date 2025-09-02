<script lang="ts">
	import axios from "axios";
	import config from "../../config";
	import { onMount } from "svelte";
	import { loggedInUser } from "../loggedInUserStore";
    let animate = false;
    let isPaused = true;
    let audioElem = null;
    let clicks = 0;
    let playing = true;
    let yuh = null;
    let es1 = false;
    let text = "Click the goober :3";
    let cps = 0;
    let interval;
    function serializeGaydata() {
        return { clicks }
    }
    function save() {
        if(!localStorage.getItem('sessionToken')) return;
        axios.post(`${config.apiEndpoint}/set-gaydata`, {data: serializeGaydata()}, {headers: {
            Authorization: localStorage.getItem("sessionToken")
        }}).then(res=>{
            // load();
        })
    }
    function load() {
        axios.get(`${config.apiEndpoint}/get-gaydata`, {headers: {
            Authorization: localStorage.getItem("sessionToken")
        }}).then(res=>{
            if(res.data.clicks) clicks += res.data.clicks;
        })
    }
    onMount(()=>{
        load();
        interval = setInterval(()=>{
            cps = 0;
        },1105)
        return ()=>{
            clearInterval(interval)
        }
    })
</script>
<svelte:head>
    <meta property="og:title" content="le silly goober :3">
    <meta property="og:description" content="you like kissing boys dont you?">
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
    <!-- <audio src="" bind:paused={isPaused}></audio> -->
    <div class="w-full h-full bg-red-500 css-selector flex items-center justify-center flex-col gap-2">
        <div class="flex items-center justify-center flex-col gap-2 w-full h-full backdrop-blur-sm">
            <div class="w-full h-full flex items-center justify-center flex-col gap-2 rainbow-hueshift" style="--hueshiftdir: 1.5s;">
                <h1 class="h3 font-bold text-white">{clicks} clicks :3</h1>
                <audio src="/eek.ogg" loop bind:this={yuh}></audio>
                <img src={!animate ? "dicoRAD_static.gif" : "/dicoRAD_edit.gif"} on:dragstart|preventDefault class="rounded-lg shadow-xl cursor-pointer" alt="" on:click={()=>{
                    yuh.play()
                    let thingy = new Audio();
                    thingy.src = "/boykissersilly.mp3";
                    thingy.play();
                    cps++;
                    // if(isPaused) {
                    clicks++;
                    animate = true;
                    setTimeout(()=>{
                        animate = false;
                    }, 0.45 * 1000)
                    // }
                    // isPaused = false;
                    if(clicks >= 10 && !es1) {
                        es1 = true;
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
                    } else if(cps == 5) {
                        clicks -= 3;
                        clicks = Math.max(clicks, 0)
                        text = "stop giving me a brain aneurysm mommy"
                    } else if(cps == 20) {
                        alert("Please stop.......... My tiny brain is rattling there..... how could you?")
                    } else {
                        text = "Click the goober :3"
                    }
                    save();
                }}>
                <p class="h3 font-bold text-white">{text}</p>
    
            </div>
    
        </div>
    </div>
{:else}
    <div class="w-full h-full w-full h-full flex items-center justify-center">
        <button class="btn variant-filled-primary">Play da silly</button>
    </div>
{/if}

<div class="fixed z-[100] right-10 bottom-10 flex flex-col gap-4">
    <!-- {#if $loggedInUser}
        <div class="card p-4 variant-glass-surface flex gap-2">
            <p>@{$loggedInUser.handle}</p>
            <button class="btn btn-sm variant-soft-success btn-sm flex-auto" on:click={(e)=>{
                save();
            }}>Save</button>
            <button class="btn btn-sm variant-soft-success btn-sm flex-auto" on:click={(e)=>{
                load();
            }}>Load</button>
        </div>
    {/if} -->
    <div class="card p-4 variant-glass-surface">
        Man, these mushrooms sure are getting funky...
    </div>
</div>