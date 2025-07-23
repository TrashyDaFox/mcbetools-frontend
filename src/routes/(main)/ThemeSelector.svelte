<script lang="ts">
    import { getModalStore, Toast } from '@skeletonlabs/skeleton';
	import { Avatar, ListBox, ListBoxItem, LightSwitch } from '@skeletonlabs/skeleton';
	import axios from 'axios';
	// @ts-ignore
	import Identicon from 'identicon.js';
	import config from '../config';
    import { getToastStore } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import type { h } from 'hastscript';
    let frog:any = writable(false);
    let themeAttribute:any = writable('trashdev');
    onMount(()=>{
        frog.set(localStorage.getItem("FROGMODE") == "YES" ? true : false)
        $themeAttribute = document.body.getAttribute('data-theme') ? document.body.getAttribute('data-theme') : 'trashdev';
        themeAttribute.subscribe(e=>{
            let theme = e.startsWith('L') ? e.substring(1) : e;
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', e)

        })
    })
</script>
<div class="card flex gap-4">
    <button class="variant-filled btn btn-sm flex-auto">
        <span class="badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </span>
        Dark Mode
    </button>
    <button class="variant-filled-surface btn btn-sm flex-auto" disabled={true}>
        <span class="badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        </span>
        <span class="flex flex-col">
            <span>Light Mode</span>
            <span class="opacity-80">Coming soon :&lt;</span>
        </span>
    </button>
    
</div>
<label class="flex items-center space-x-2">
	<input class="checkbox" type="checkbox" checked={$frog} on:change={(e)=>{
        localStorage.setItem("FROGMODE", e.target.checked ? "YES" : "NO")
    }} />
	<p>🐸 Froggy Mode :3</p>
</label>
<div class="h-4"></div>
<p class="text-center">Color Scheme</p>
<div class="h-4"></div>
<ListBox on:change={()=>{

}}>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="trashdev">
        Default
        <br>
        <h6 class="h6 opacity-50">Made by @trashy</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="wintry">
        Wintry
        <br>
        <h6 class="h6 opacity-50">Made by Skeleton</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="skeleton">
        Skeleton
        <br>
        <h6 class="h6 opacity-50">Made by Skeleton</h6>
    </ListBoxItem>

    <ListBoxItem bind:group={$themeAttribute} name="medium" value="trashdev-legacy">
        Default (Old)
        <br>
        <h6 class="h6 opacity-50">Made by @trashy</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="winter">
        Winter
        <br>
        <h6 class="h6 opacity-50">Made by @trashy</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="obsidian">
        Obsidian
        <br>
        <h6 class="h6 opacity-50">Made by @trashy</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="cherry">
        Cherry (files.trashdev.org)
        <br>
        <h6 class="h6 opacity-50">Made by @trashy</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="prismdark">
        Prism Dark
        <br>
        <h6 class="h6 opacity-50">Made by Ciani01</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="fall">
        Fall
        <br>
        <h6 class="h6 opacity-50">Made by Ciani01</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="catpuccin">
        Catpuccin
        <br>
        <h6 class="h6 opacity-50">Made by Catppuccin</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="candy">
        Candy
        <br>
        <h6 class="h6 opacity-50">Made by XdNikhilLoL</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="caves">
        Caves
        <br>
        <h6 class="h6 opacity-50">Made by FruitKitty</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="nord">
        Nord
        <br>
        <h6 class="h6 opacity-50">Made by nord</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="doors">
        DOORS
        <br>
        <h6 class="h6 opacity-50">Made by HollyDaSilly</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="kawaii">
        Kawaii
        <br>
        <h6 class="h6 opacity-50">Made by @muskiei</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="pearlywhites">
        Pearly Whites
        <br>
        <h6 class="h6 opacity-50">Made by @muskiei</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="blossom">
        Blossom
        <br>
        <h6 class="h6 opacity-50">Made by @muskiei</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="ocean">
        Ocean
        <br>
        <h6 class="h6 opacity-50">Made by @muskiei</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="halloween">
        Halloween
        <br>
        <h6 class="h6 opacity-50">Made by @muskiei</h6>
    </ListBoxItem>
</ListBox>
<!-- a -->