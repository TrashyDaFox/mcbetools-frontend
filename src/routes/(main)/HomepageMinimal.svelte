<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import { getContext, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import config from '../config';
	import axios from 'axios';
	import ProjectCard from './ProjectCard.svelte';
	import { getUserAvatar } from './AvatarRenderer';
	import { featuredProjects } from './loggedInUserStore';
	import ProjectCards from './ProjectCards.svelte';
	import FrontpageHeader from './FrontpageHeader.svelte';
	import { getModalStore, ProgressRadial } from '@skeletonlabs/skeleton';
	// import { Script } from 'vm';
	import SidebarNavigation from './SidebarNavigation.svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import TotpInputWidget from './TOTPInputWidget.svelte';
	import styles from '../styles';
	import CreatorPointRenderer from './CreatorPointRenderer.svelte';
	import ProfileModal from './ProfileModal.svelte';
	import AvatarRenderer from './AvatarRenderer.svelte';
	import EventRenderer from './events/EventRenderer.svelte';
	import SidebarNavButton from '$lib/nav/SidebarNavButton.svelte';
	let newestMember = writable(null)
	let featuredSection;
	let ourTeam = writable(null)
	let redirect = writable('none');
	let events = [];
	axios.get(`${config.apiEndpoint}/events`).then(res=>{
		events = res.data.filter(_=>new Date(_.startDate) <= new Date() && new Date(_.endDate) >= new Date())
	})
	let sidebarContent = getContext("sidebarContent2")
	let nearLeft = true;
	let nearRight = false;
	let isDragging = false;
  let startX;
  let scrollStart;
  let isDragging2 = false;
  let holdThreshold = 500; // ms to count as a hold
  let holdTimer;

  function onMouseDown(event) {
	let scrollDiv = featuredSection;
    isDragging = true;
    startX = event.clientX;
    scrollStart = scrollDiv.scrollLeft;
    scrollDiv.style.cursor = 'grabbing';
    scrollDiv.style.userSelect = 'none';

	holdTimer = setTimeout(() => {
		isDragging2 = true;
		holdTimer = null;
    }, holdThreshold);
  }

  function onMouseMove(event) {
	// if(holdTimer) {
	// 	clearTimeout(holdTimer)
	// }
	let scrollDiv = featuredSection;
    if (!isDragging) return;
    const delta = event.clientX - startX;
    scrollDiv.scrollLeft = scrollStart - delta;
  }

  function onMouseUp() {
	let scrollDiv = featuredSection;
	setTimeout(()=>{
		isDragging = false;
		isDragging2 = false;

	},10)
    scrollDiv.style.cursor = 'grab';
    scrollDiv.style.userSelect = 'auto';
  }

  function onMouseLeave() {
	let scrollDiv = featuredSection;
    isDragging = false;
    scrollDiv.style.cursor = 'grab';
    scrollDiv.style.userSelect = 'auto';
  }
	function checkScroll() {
		const left = featuredSection.scrollLeft;
		const maxScroll = featuredSection.scrollWidth - featuredSection.clientWidth;
		nearLeft = left <= 20;
		nearRight = left >= maxScroll - 20;
	}
	onMount(() => {
		let searchParams = new URLSearchParams(window.location.search);
		redirect.update((val) =>
			searchParams.has('redirect') ? (searchParams.get('redirect') ?? 'none') : 'none'
		);
		axios.get(`${config.apiEndpoint}/newest-member`).then(res=>{
			try {
				if(res.data.handle) {
					newestMember.set(res.data)
				}

			} catch {}
		}).catch(()=>{})
		axios.get(`${config.apiEndpoint}/our-team`).then(res=>{
			try {
				if(!res.data.error) {
					ourTeam.set(res.data.members)
				}

			} catch {}
		}).catch(()=>{})

		// sidebarContent.set(TotpInputWidget)
		// return ()=>{
			// sidebarContent.set(null)
		// }
		// afterNavigate(() => {
    //   document.dispatchEvent(new CustomEvent('set-sidebar', { detail: SidebarNavigation }));
	});
	// let featuredProjects = writable([]);
	
	let recentProjects = writable([]);
		onMount(()=>{
			axios.get(`${config.apiEndpoint}/v2/search`, {
			headers: {
				Authorization: localStorage.getItem('sessionToken')
			},
			params: {
				tagSearchMode: "exclude",
				tags: "LEGENDARY,MYTHIC,FEATURED",
				q: "null",
				sortMode: "RECENT",
				ignoreDeprecated: "false"
			}
		}).then((res) => {
			recentProjects.set(res.data);
		});
			// axios.get(`${config.apiEndpoint}/featured-submissions`, {
			// headers: {
				// Authorization: localStorage.getItem('sessionToken')
			// }
		// }).then((res) => {
			// featuredProjects.set(res.data);
		// });
	})
	const modalStore = getModalStore();
	let creatorOfTheMonth = writable(null);
	axios.get(`${config.apiEndpoint}/creator-of-the-week`).then(res=>{
		axios.get(`${config.apiEndpoint}/user-profile/${res.data}`).then(res=>{
			if(!res.data.error) {
				creatorOfTheMonth.set(res.data.userData);
			}
		})
	})
	export const csr = true;
</script>

<div class="pt-32 flex items-center justify-center flex-col gap-4">
    <h1 class="h1 font-bold fancy-title2 fancy-title3">Welcome to MCBETools</h1>

    <nav class="list-nav px-2 py-4 w-full max-w-3xl card">
        <p class ="ml-2 opacity-50">Creator of The Week</p>
        {#if $creatorOfTheMonth}
            <div class="py-2">
                <div class="flex gap-4 card p-2 variant-soft-primary">
                    <AvatarRenderer profile={$creatorOfTheMonth} width="w-16" />
                    <!-- <div class="flex flex-col"> -->
                        <!-- <p class="text-xl font-bold">{$creatorOfTheMonth.displayName}</p> -->
                    <a href="/@{$creatorOfTheMonth.handle}" class="anchor text-xl">{$creatorOfTheMonth.displayName}</a>
                    <!-- </div> -->
                </div>
    
            </div>
        {/if}
        <p class ="ml-2 opacity-50">Links</p>
       <SidebarNavButton href="/discover">
            <svelte:fragment slot="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-compass"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
            </svelte:fragment>
            Discover
        </SidebarNavButton>
        <SidebarNavButton href="/blog">
            <svelte:fragment slot="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
                </svg>
            </svelte:fragment>
            Blog
        </SidebarNavButton>
        <SidebarNavButton href="/events">
            <svelte:fragment slot="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
            </svelte:fragment>
            Events <span class="badge variant-filled-primary">{events.length}</span>
        </SidebarNavButton>
        <SidebarNavButton href="/featured">
            <svelte:fragment slot="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </svelte:fragment>
            Featured
        </SidebarNavButton>
        <SidebarNavButton href="/servers">
            <svelte:fragment slot="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-server">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                    <line x1="6" y1="6" x2="6.01" y2="6"/>
                    <line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
            </svelte:fragment>
            Servers
        </SidebarNavButton>
        <SidebarNavButton href="/settings">
            <svelte:fragment slot="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </svelte:fragment>
            Settings
        </SidebarNavButton>
    </nav>

</div>