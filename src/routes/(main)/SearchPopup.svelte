<script lang="ts">
	import { getModalStore, initializeStores, Toast } from '@skeletonlabs/skeleton';
	import { Avatar, ListBox, ListBoxItem, LightSwitch } from '@skeletonlabs/skeleton';
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
    let searchQuery: string = '';
    let inputElement: any;
    onMount(()=>{
        inputElement.focus();
    })
</script>
<style>
    :root {
        --animate-duration: 400ms;
    }
</style>
<div class="flex md:hidden flex-col gap-4 card bg-initial bottom-0 left-0 fixed p-4 animate__animated animate__fadeInUpBig h-fit w-full">
    <div class="flex gap-4">
        <input type="text" bind:value={searchQuery} bind:this={inputElement} placeholder="Search Query" class="input">
        <button class="btn btn-sm variant-filled-primary" on:click={()=>{
            modalStore.close();
            let params = new URLSearchParams();
            params.set('q', searchQuery);
            let a = document.createElement('a');
            a.href = `/search?${params.toString()}`;
            a.click()
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
    </div>
</div>