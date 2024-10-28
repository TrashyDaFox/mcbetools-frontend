<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, Avatar, popup, Modal } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import { initializeStores, Drawer, getDrawerStore, getModalStore } from '@skeletonlabs/skeleton';
	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);
	// Floating UI for Popups
	// @ts-ignore
    import Identicon from 'identicon.js';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import config from '../config';
	import { writable } from 'svelte/store';
	import { onMount, setContext } from 'svelte';
	import axios from 'axios';
	import SidebarNavigation from './SidebarNavigation.svelte';
	import { loggedInUser } from './loggedInUserStore';
	import NotificationPopout from './NotificationPopout.svelte';
	import SearchPopup from './SearchPopup.svelte';
	import UserPopout from './popouts/UserPopout.svelte';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	initializeStores();
	const modalStore = getModalStore();
	const drawerStore = getDrawerStore();
	setContext("drawerStore", drawerStore)
	setContext("loggedInUser", loggedInUser);
	onMount(()=>{
		document.body.setAttribute('data-theme', localStorage.getItem('theme') ? localStorage.getItem('theme') : 'trashdev')
		if(localStorage.getItem('sessionToken')) {
			axios.get(`${config.apiEndpoint}/user-profile/me`, {
				headers: {
					Authorization: localStorage.getItem('sessionToken')
				}
			}).then(res=>{
				if(!res.data.error) {
					loggedInUser.set(res.data.userData);
				}
			})
		}		
	})
	function textToHex(text: string) {
        let hex = text.split('').map(_=>{
            return _.charCodeAt(0).toString(16)
        }).join('')
        if(hex.length < 15) {
            return `5cedaf0abc4a5a9efd0126a9${hex}`
        } else {
            return `${hex}`
        }
    }
	const yes = {
	event: 'focus-click',
	target: 'notifPopup',
	placement: 'bottom'
	};
	const popupFocusClick = {
		event: 'focus-click',
		target: 'popupFocusClick',
		placement: 'bottom'
	};
	let searchQuery = '';
	onMount(()=>{
		let params = new URLSearchParams(window.location.search);
		if(params.has('q')) {
			searchQuery = params.get('q');
		}
	})
	function drawerOpen(): void {
	drawerStore.open({
		meta: {
			drawerClose: drawerStore.close
		}
	});
}
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>
<Modal />
<style>

@media (max-width: 640px) {
  .custom-class {
    position: fixed !important;
    left: 0 !important;
    bottom: 0 !important;
    height: 24rem; /* 96 in Tailwind */
    width: 100% !important;
    margin: 0 !important;
    top: auto !important;
  }
}

</style>
<Drawer>
	<SidebarNavigation />
</Drawer>
<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64 border-solid border-r border-surface-200/10" slotHeader="border-solid border-b border-surface-200/10">
	<svelte:fragment slot="sidebarLeft">
		<SidebarNavigation />
	</svelte:fragment>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button>
				<button class="lg:hidden btn btn-sm mr-4" on:click={()=>{
					modalStore.trigger({
                        type: 'component',
                        component: {ref: SearchPopup}
                    })
				}}>
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
					</span>
				</button>
				<!-- <strong class="text-xl uppercase sm:hidden">{config.productName}</strong> -->
				<div class="input-group input-group-divider hidden lg:grid-cols-[auto_1fr_auto] lg:grid">
					<input type="search" placeholder="Search..." bind:value={searchQuery} on:keydown={(e)=>{
						if(e.key == "Enter") {
							let params = new URLSearchParams();
							params.set('q', searchQuery);
							let a = document.createElement('a');
							a.href = `/search?${params.toString()}`;
							a.click()
						}
					}}>
					<button class="btn bg-transparent" on:click={()=>{
						let params = new URLSearchParams();
						params.set('q', searchQuery);
						let a = document.createElement('a');
						a.href = `/search?${params.toString()}`;
						a.click()
					}}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
					</button>
				</div>

			</svelte:fragment>
			<svelte:fragment slot="trail">
				<!-- <input type="text" class="input input-lg" placeholder="Search">
				<button class="btn btn-icon variant-filled-primary">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
				</button> -->
				<div class="card p-4 bg-intiial sm:hidden z-50" data-popup="notifPopup">
					<NotificationPopout	/>
					<div class="arrow bg-initial" />
				</div>
				<div class="shadow-2xl p-4 card bg-initial backdrop-blur-lg sm:hidden z-50 min-w-56 custom-class overflow-hidden" data-popup="popupFocusClick">
					{#if $loggedInUser}
						<!-- <UserPopout user={loggedInUser} /> -->
						<div class="flex gap-4">
							<div class="w-16">
								<Avatar src={$loggedInUser.avatarURL ? `${config.apiEndpoint}${$loggedInUser.avatarURL}` : `data:image/png;base64,${new Identicon(textToHex($loggedInUser.handle)).toString()}`} width="w-16" rounded="rounded-full" />
							</div>
							<div class="flex-col flex w-full">
								<div class="flex w-full justify-between">
									<h3 class="h3">{$loggedInUser.displayName}</h3>
									<button class="btn btn-sm variant-filled-error md:hidden">X</button>
								</div>
								<p class="opacity-50">@{$loggedInUser.handle}</p>
							</div>
						</div>
						<div class="h-4"></div>
						{#if $loggedInUser.microsoftAccountLinked}
							<p>Microsoft Account Linked</p>
						{:else}
							<button class="variant-soft-error btn-sm btn w-full" on:click={()=>{
								axios.post(`${config.apiEndpoint}/link-ms-account`, {}, {
									headers: {
										Authorization: localStorage.getItem('sessionToken')
									}
								}).then(res=>{
									let a = document.createElement('a');
									a.target = "blank";
									a.href = `https://microsoft.com/link?otc=${res.data}`;
									a.click();
								})
							}}>Link Microsoft Account</button>
						{/if}
						<div class="h-4"></div>
						<button class="variant-filled btn-sm btn w-full" on:click={()=>{
							location.pathname = '/projects'
						}}>View my projects</button>
						<div class="h-4"></div>
						<button class="variant-filled btn-sm btn w-full" on:click={()=>{
							location.pathname = '/profiles/me'
						}}>View my profile</button>
						<div class="h-4"></div>
						<button class="variant-filled btn-sm btn w-full" on:click={()=>{
							loggedInUser.set(null)
							localStorage.removeItem("sessionToken")
							location.pathname = '/'
						}}>Logout</button>
					{/if}
					<div class="hidden md:block arrow bg-initial" />
				</div>
				{#if $loggedInUser}
					<button class="btn btn-icon variant-ghost-surface w-8 h-8 p-2" use:popup={yes}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
					</button>
					<button class="btn btn-sm variant-ghost-surface flex gap-4" use:popup={popupFocusClick}>
						<Avatar src={$loggedInUser.avatarURL ? `${config.apiEndpoint}${$loggedInUser.avatarURL}` : `data:image/png;base64,${new Identicon(textToHex($loggedInUser.handle)).toString()}`} width="w-6" rounded="rounded-full" />
						{$loggedInUser.displayName}
						{#if $loggedInUser.microsoftAccountLinked}
						 <img src="/mslogo.svg" class="w-6 h-6" alt="">
						{/if}
					</button>
				{:else}
					<a
						class="btn btn-sm variant-ghost-surface"
						href="/login"
					>
						Login
					</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
