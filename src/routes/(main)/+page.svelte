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
	import { afterNavigate } from '$app/navigation';
	import TotpInputWidget from './TOTPInputWidget.svelte';
	import styles from '../styles';
	import CreatorPointRenderer from './CreatorPointRenderer.svelte';
	import ProfileModal from './ProfileModal.svelte';
	import AvatarRenderer from './AvatarRenderer.svelte';
	let newestMember = writable(null)
	let featuredSection;
	let ourTeam = writable(null)
	let redirect = writable('none');
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
			axios.get(`${config.apiEndpoint}/get-recent-projects`, {
			headers: {
				Authorization: localStorage.getItem('sessionToken')
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
{#if $creatorOfTheMonth && $featuredProjects && $recentProjects}
	<div class="container h-full mx-auto max-w-none">
		{#if $redirect == 'accountverify'}
			<div class="h-3"></div>
			<div class="flex w-full justify-center items-center">
				<div class="card w-full h-fit variant-soft-primary p-4 w-fit">
					<h1 class="h3 font-bold">Welcome to {config.productName}</h1>
					<p>Thanks for verifying your account. You can now use your account</p>
					<div class="h-3"></div>
					<a href="/profiles/me" class="btn btn-sm variant-filled-primary">View your profile</a>
				</div>
			</div>
		{/if}
		<!-- <div style="background:url({$creatorOfTheMonth && $creatorOfTheMonth.bannerURL ? `${config.apiEndpoint}${$creatorOfTheMonth.bannerURL}` : `/defaultbanner.png`});background-size:cover;background-position:center;" class="w-full h-56 rounded-lg"> -->
		<div class="bg-gradient-to-b from-surface-400/25 to-surface-100/0 p-4 rounded-lg overflow-hidden">
			<div style="background-image:url({$creatorOfTheMonth && $creatorOfTheMonth.bannerURL ? `${config.apiEndpoint}${$creatorOfTheMonth.bannerURL}` : `/leafbg.png`});background-size:cover;background-position:center;" class="w-full md:h-72 lg:h-96 overflow-hidden shadow-lg rounded-lg overflow-hidden max-h-none">
				<div class="w-full h-full backdrop-blur-md justify-center items-center flex flex-col gap-4 bg-surface-900/50 p-4 md:p-0 overflow-hidden rounded-lg">
					<!-- bg-gradient-to-b from-surface-900/0 to-surface-900 -->
					{#if $creatorOfTheMonth}
						<h2 class="h2 font-bold fancy-title hidden md:block">✨ Creator of The Week ✨</h2>
						<h2 class="h3 font-bold fancy-title block md:hidden">Creator of The Week</h2>
						<div class="flex gap-4 items-center flex-col md:flex-row">
							<AvatarRenderer profile={$creatorOfTheMonth} width="w-24" />
							<div class="flex flex-col">
								<div class="flex gap-4">
									<h1 class="text-xl md:text-4xl font-bold">{$creatorOfTheMonth.displayName}</h1>
									<div class="hidden md:block">
										{#if $creatorOfTheMonth && $creatorOfTheMonth.creatorpoints && $creatorOfTheMonth.creatorpoints > 0}
											<CreatorPointRenderer amt={$creatorOfTheMonth.creatorpoints} devMode={false} />
										{/if}
									</div>
								</div>
								<a href={`/profiles/${$creatorOfTheMonth.handle}`} class="no-underline hover:underline opacity-75">@{$creatorOfTheMonth.handle}</a>
							</div>
						</div>
					{/if}
				</div>
			</div>
			<!-- <FrontpageHeader />			 -->
		</div>
		<div class="p-4 flex flex-wrap gap-4">
			<div class="flex-auto" class:rounded-container-token={$newestMember && $newestMember.bannerURL} class:overflow-hidden={$newestMember && $newestMember.bannerURL} style={$newestMember && $newestMember.bannerURL ? `background-image:url(${config.apiEndpoint}${$newestMember.bannerURL})` : ``}>
				<div class="w-full h-56 overflow-hidden !relative card p-4 {$newestMember && $newestMember.bannerURL ? "!bg-gradient-to-br from-surface-900/50 to-surface-900/70" : ""}" class:variant-glass-surface={$newestMember && $newestMember.bannerURL} class:placeholder2={$newestMember ? true : false}>
					<div class="!relative w-full h-full">
						<h3 class="fancy-title2 h3 p-0 m-0 top-0 left-0 !absolute">Newest Creator</h3>
						<div class="h-full flex items-center justify-center w-full">
							{#if $newestMember}
								<div class="flex gap-4">
									<AvatarRenderer profile={$newestMember} width="w-16" />
									<div class="flex flex-col">
										<h3 class="text-3xl font-bold">{$newestMember.displayName}</h3>
										<a class="opacity-50 no-underline hover:underline text-xl hover:opacity-100" href="/@{$newestMember.handle}">@{$newestMember.handle}</a>
									</div>
								</div>
							{/if}
	
						</div>
	
					</div>
				</div>
					
			</div>
			<div class="flex-auto h-56 card p-4" class:placeholder2={$newestMember ? true : false}>
				<h3 class="fancy-title2 h3 p-0 m-0">Our Team</h3>
				<div class="w-full flex flex-wrap gap-4 pt-4 overflow-visible">
					{#if $ourTeam}
						{#each $ourTeam as teamMember}
							<AvatarRenderer profile={teamMember} width="flex-auto aspect-square max-w-16 object-cover cursor-pointer" on:click={()=>{
								modalStore.trigger({
									type: 'component',
									component: {ref: ProfileModal},
									meta: {profile: teamMember}
								})
							}} />
						{/each}
					{/if}
				</div>
			</div>
			<div class="flex-auto h-56 card p-4" class:placeholder2={$newestMember ? true : false}>
				<h3 class="fancy-title2 h3 p-0 m-0">Community Events</h3>
				<div class="w-full flex flex-wrap gap-4 pt-4">
					<p class="opacity-50 text-3xl">Coming soon...</p>
				</div>
			</div>
			
		</div>

		<div class="div p-4 bg-primary-500/12 pb-[0px]">
			<div class="flex items-center justify-between">
				<hr class="flex-grow border-t !border-surface-500">
				<h3 class="h3 font-bold text-primary-500 px-4 fancy-title2">⭐ Featured Submissions ⭐</h3>
				<hr class="flex-grow border-t !border-surface-500">
			</div>
			<div class="h-4"></div>
		</div>
		<div class="p-4 py-[0px] w-full overflow-x-auto scrollbar-hide relative scroll-mask" style="--fade-right-c: {nearLeft || (!nearLeft && !nearRight) ? "transparent" : "black"};--fade-left-c: {nearRight || (!nearLeft && !nearRight) ? "transparent" : "black"};cursor: grab !important; overflow-y: hidden;" on:scroll={(e)=>{
			checkScroll()
		}} bind:this={featuredSection}   on:mousedown={onMouseDown}
  on:mousemove={onMouseMove}
  on:mouseup={onMouseUp}
  on:mouseleave={onMouseLeave} on:wheel={(e)=>{
	// 		e.preventDefault();
	// 		// featuredSection.scrollLeft += e.deltaY;
	// 		featuredSection.scrollBy({
    //   left: e.deltaY * 1.5, // adjust scroll speed
    //   behavior: 'smooth'     // smooth scrolling
    // });
	    // Only scroll horizontally if the container can scroll
		return;
		let container = featuredSection;
		const canScrollLeft = container.scrollLeft > 0;
    const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth;

    if ((e.deltaY < 0 && canScrollLeft) || (e.deltaY > 0 && canScrollRight)) {
      e.preventDefault(); // only prevent default if container actually scrolls
      container.scrollBy({
        left: e.deltaY * 1.5, // horizontal scroll amount
        behavior: 'smooth'
      });
	  checkScroll()
    }
		}}>
			<!-- <div class="absolute bg-gradient-to-r from-surface-9"></div> -->
			<!-- <button class="btn variant-filled btn-icon w-10 h-10 hidden md:block"></button> -->
			<div class="flex gap-4 min-w-max items-stretch">

				{#each $featuredProjects as project}
					<div class="max-w-screen w-[420px] flex items-stretch" on:click={(e)=>{
						if(isDragging2) e.preventDefault();
					}}>
						<ProjectCard project={project} preventClick={isDragging2} extraClasses="cursor-[inherit]" />
					</div>
				{/each}
			</div>
		</div>
		<div class="pt-4 px-4">
			<a class="btn variant-ghost-surface w-full" href="/featured">
			<span class="text-lg fancy-title2">View All Featured</span></a>

		</div>

		<div class="div p-4">
			<div class="flex items-center justify-between">
				<hr class="flex-grow border-t border-surface-300">
				<h3 class="h3 font-bold opacity-80 px-4">Recent Submissions</h3>
				<hr class="flex-grow border-t border-surface-300">
			</div>

			<div class="h-4"></div>
			<!-- <ProjectCards projects={$recentProjects} /> -->
			<!-- <div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 w-full gap-4 justify-items-center"> -->
			<div class={styles.submissionGrid}>
				{#each $recentProjects as project}
					<ProjectCard project={project} />
				{/each}
			</div>
		</div>
		<!-- <div class="h-48"></div>
		<div class="flex items-center justify-center flex relative">
			<div class="why2"></div>
			<div class="why"></div>
		</div>
		<div class="h-48"></div> -->
	</div>
{:else}
	<div class="w-full h-full flex items-center justify-center">
		<ProgressRadial />
	</div>
{/if}
<style lang="postcss">
.fancy-title {
	font-size: 2rem;
	font-weight: 800;
	background: linear-gradient(
		-45deg,
		#ffadff,
		#ffd6ff,
		#cafffb,
		#d2f1ff,
		#ffadff
	);
	background-size: 300% 300%;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: shimmer 4s ease-in-out infinite;
	position: relative;
}

.fancy-title2 {
	font-weight: 800;
	background: linear-gradient(
		-45deg,
		#ffadff,
		#ffd6ff,
		#cafffb,
		#d2f1ff,
		#ffadff
	);
	background-size: 300% 300%;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: shimmer 4s ease-in-out infinite;
	position: relative;
}
.fancy-title::after {
	content: "✨";
	position: absolute;
	right: -1.5em;
	top: 0.1em;
	animation: twinkle 1.5s infinite ease-in-out;
	font-size: 1.2em;
}

@keyframes shimmer {
	0% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
	100% { background-position: 0% 50%; }
}

@keyframes twinkle {
	0%, 100% { opacity: 0.3; transform: scale(0.9) rotate(0deg); }
	50% { opacity: 1; transform: scale(1.3) rotate(20deg); }
}
@keyframes floatUpDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes flicker {
  0% {
    filter: brightness(1.2) blur(100px);
  }
  25% {
    filter: brightness(1.4) blur(120px);
  }
  50% {
    filter: brightness(1.2) blur(110px);
  }
  75% {
    filter: brightness(1.3) blur(115px);
  }
  100% {
    filter: brightness(1.2) blur(100px);
  }
}

.why {
  width: 200px; /* Adjust the size of your image */
  height: 200px;
  background-color: #ffab51;
  opacity: 0.5;
  border-radius: 200px;
  animation: floatUpDown 4s ease-in-out infinite, flicker 2s infinite;
  display: inline-block;
  position: absolute;
  cursor: pointer;
}
.why2 {
	width: 200px; /* Adjust the size of your image */
  height: 200px;
  background-image: url('/Torch_JE7.webp'); /* Replace with your transparent image path */
  background-size: contain;
  background-repeat: no-repeat;
  animation: floatUpDown 4s ease-in-out infinite;
  display: inline-block;
  position: absolute;
  cursor: pointer;
  z-index: 4
}

</style>

