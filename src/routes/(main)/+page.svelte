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
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	// import { Script } from 'vm';
	import SidebarNavigation from './SidebarNavigation.svelte';
	import { afterNavigate } from '$app/navigation';
	import TotpInputWidget from './TOTPInputWidget.svelte';
	import styles from '../styles';
	import CreatorPointRenderer from './CreatorPointRenderer.svelte';
	let redirect = writable('none');
	let sidebarContent = getContext("sidebarContent2")

	onMount(() => {
		let searchParams = new URLSearchParams(window.location.search);
		redirect.update((val) =>
			searchParams.has('redirect') ? (searchParams.get('redirect') ?? 'none') : 'none'
		);


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
		<div class="bg-gradient-to-b from-surface-100/10 to-surface-100/0">
			<div style="background-image:url({$creatorOfTheMonth && $creatorOfTheMonth.bannerURL ? `${config.apiEndpoint}${$creatorOfTheMonth.bannerURL}` : `/leafbg.png`});background-size:cover;background-position:center;" class="w-full h-56 md:h-72 lg:h-96overflow-hidden shadow-lg">
				<div class="w-full h-full backdrop-blur-md justify-center items-center flex flex-col gap-4 bg-surface-900/50">
					<!-- bg-gradient-to-b from-surface-900/0 to-surface-900 -->
					{#if $creatorOfTheMonth}
						<h2 class="h2 font-bold fancy-title">Creator of The Week</h2>
						<div class="flex gap-4 items-center">
							<img src={getUserAvatar($creatorOfTheMonth)} class="rounded-full w-24 h-24 object-cover" />
							<div class="flex flex-col">
								<div class="flex gap-4">
									<h1 class="text-4xl font-bold">{$creatorOfTheMonth.displayName}</h1>
									{#if $creatorOfTheMonth && $creatorOfTheMonth.creatorpoints && $creatorOfTheMonth.creatorpoints > 0}
										<CreatorPointRenderer amt={$creatorOfTheMonth.creatorpoints} devMode={false} />
									{/if}
								</div>
								<a href={`/profiles/${$creatorOfTheMonth.handle}`} class="no-underline hover:underline opacity-75">@{$creatorOfTheMonth.handle}</a>
							</div>
						</div>
					{/if}
				</div>
			</div>
			<!-- <FrontpageHeader />			 -->
		</div>

		<div class="div p-4 bg-primary-500/12">
			<div class="flex items-center justify-between my-4">
				<hr class="flex-grow border-t border-surface-300">
				<h3 class="h3 font-bold opacity-80 text-primary-500 px-4">Featured Submissions</h3>
				<hr class="flex-grow border-t border-surface-300">
			</div>
			<div class="h-4"></div>
			<div class={styles.submissionGrid}>
				{#each $featuredProjects as project}
					<ProjectCard project={project} />
				{/each}
			</div>
		</div>

		<div class="div p-4">
			<div class="flex items-center justify-between my-4">
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

