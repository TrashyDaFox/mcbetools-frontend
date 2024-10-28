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

    let themeAttribute:any = writable('trashdev');
    onMount(()=>{
        $themeAttribute = document.body.getAttribute('data-theme') ? document.body.getAttribute('data-theme') : 'trashdev';
        themeAttribute.subscribe(e=>{
            document.body.setAttribute('data-theme', e);
            localStorage.setItem('theme', e)

        })
    })
</script>

<ListBox on:change={()=>{

}}>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="trashdev">
        Default
        <br>
        <h6 class="h6 opacity-50">Made by Luna</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="winter">
        Winter
        <br>
        <h6 class="h6 opacity-50">Made by Luna</h6>
    </ListBoxItem>
    <ListBoxItem bind:group={$themeAttribute} name="medium" value="obsidian">
        Obsidian
        <br>
        <h6 class="h6 opacity-50">Made by Luna</h6>
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
</ListBox>
