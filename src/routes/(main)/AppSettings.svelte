<script lang="ts">
	import { getModalStore, initializeStores, Toast } from '@skeletonlabs/skeleton';
	import { Avatar, ListBox, ListBoxItem, LightSwitch, Modal } from '@skeletonlabs/skeleton';
	import axios from 'axios';
	// @ts-ignore
	import Identicon from 'identicon.js';
	import config from '../config';
    import { getToastStore } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
    import 'animate.css';
	import ThemeSelector from './ThemeSelector.svelte';
    initializeStores();
    let modalStore = getModalStore();
    let valueSingle: string = 'theme';
    let page: string = 'main';
</script>
<style>
    :root {
        --animate-duration: 400ms;
    }
</style>
<Modal />
<div class="flex md:hidden flex-col gap-4 card bg-initial bottom-0 left-0 fixed p-4 animate__animated animate__fadeInUpBig min-h-[50vh] w-full">
    <div class="top-bar flex h-fit w-full">
        <h1 class="h3 font-bold">Settings</h1>
        <div class="flex-1"></div>
        {#if page != "main"}
            <button class="btn btn-icon variant-ghost-surface" on:click={()=>{
                page = "main"
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <div class="w-2"></div>
        {/if}
        <button class="btn btn-icon variant-filled-error float-right" on:click={()=>{
            modalStore.clear();
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
    </div>
    <hr />
    <div class="settings-screen-mobile w-full flex-1">
        <div class="settings-screen-mobile-inner w-full h-full">
            {#if page == "main"}
                <button class="btn btn-sm flex gap-4 variant-ghost-surface w-full justify-start" on:click={()=>{
                    page = "appearance"
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80ZM260-440q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Z"/></svg>
                    Appearance        
                </button>
            {/if}
            {#if page == "appearance"}
                <ThemeSelector />
            {/if}
        </div>
    </div>
</div>
<div class="card bg-initial p-4 py-8 flex gap-4 hidden md:flex">
    <ListBox>
        <ListBoxItem bind:group={valueSingle} name="medium" value="theme">
            <svelte:fragment slot="lead">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80ZM260-440q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Z"/></svg>
            </svelte:fragment>
            Appearance
        </ListBoxItem>
        <ListBoxItem bind:group={valueSingle} name="medium" value="app-info">
            <svelte:fragment slot="lead">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-280q17 0 28.5-11.5T520-320v-160q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280Zm0-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
            </svelte:fragment>
            App Info
        </ListBoxItem>
        <ListBoxItem bind:group={valueSingle} name="medium" value="account">
            <svelte:fragment slot="lead">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-360q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0 120q77 0 139-44t87-116h14l52 52q6 6 13 8.5t15 2.5q8 0 15-2.5t13-8.5l52-52 70 55q6 5 13.5 7.5T779-336q8-1 14.5-4.5T805-350l90-103q5-6 7.5-13t2.5-15q0-8-3-14.5t-8-11.5l-41-41q-6-6-13.5-9t-15.5-3H506q-24-68-84.5-114T280-720q-100 0-170 70T40-480q0 100 70 170t170 70Z"/></svg>
            </svelte:fragment>
            Account
        </ListBoxItem>
    </ListBox>
    <div class="min-h-56 w-full h-[90vh] md:w-[500px] md:h-[400px]" style="width: 500px; height: 400px;overflow-y:scroll;">
        {#if valueSingle == "account"}
            <p>TODO: Add profile options + password reset</p>
        {/if}
        {#if valueSingle == "app-info"}
            <p>MCBE Tools v1.0.1</p>
        {/if}
        {#if valueSingle == "theme"}
            <ThemeSelector />
        {/if}
    </div>

</div>


<!-- <nav class="list-nav w-full">
    <ul class="w-ful">
        <li class="w-full">
            <button on:click={()=>{
                document.body.setAttribute('data-theme', 'trashdev');
                localStorage.setItem('theme', 'trashdev');
                themeAttribute.set('trashdev');
            }} class={$themeAttribute == 'trashdev' ? "bg-primary-500/10 text-primary-100" : ""}>
                <span class="flex-auto">Default</span>
            </button>
        </li>
        <li class="w-full">
            <button on:click={()=>{
                document.body.setAttribute('data-theme', 'winter');
                localStorage.setItem('theme', 'winter');
                themeAttribute.set('winter');
            }} class={$themeAttribute == 'winter' ? "bg-primary-500/10 text-primary-100" : ""}>
                <span class="flex-auto">Winter</span>
            </button>
        </li>
        <li class="w-full">
            <button on:click={()=>{
                document.body.setAttribute('data-theme', 'fall');
                localStorage.setItem('theme', 'fall');
                themeAttribute.set('fall');
            }} class={$themeAttribute == 'fall' ? "bg-primary-500/10 text-primary-100" : ""}>
                <span class="flex-auto">Fall</span>
            </button>
        </li>
    </ul>
</nav> -->
