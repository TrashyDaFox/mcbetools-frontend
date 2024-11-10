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
	import { featuredProjects, loggedInUser } from '../(main)/loggedInUserStore';
	// import NotificationPopout from './NotificationPopout.svelte';
	// import SearchPopup from './SearchPopup.svelte';
	// import UserPopout from './popouts/UserPopout.svelte';
	import Yes from '../../HeaderWidgets/Yes.svelte';
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

axios.get(`${config.apiEndpoint}/featured-submissions`, {

		}).then((res) => {
            // if(res.data.find(_=>_.url == project.url)) featured = true;
			featuredProjects.set(res.data);
        });
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

		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
