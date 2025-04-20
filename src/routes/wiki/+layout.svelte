<script lang="ts">
    import { AppShell, AppBar } from "@skeletonlabs/skeleton";
import "../app.postcss"
import '../app.postcss';
	import { Avatar, popup, Modal } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import { initializeStores, Drawer, getDrawerStore, getModalStore, storePopup } from '@skeletonlabs/skeleton';
	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	// initializeStores();

</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64 border-solid border-r border-surface-200/10" slotHeader="border-solid border-b border-surface-200/10">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
                <button class="btn btn-icon variant-soft-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
                </button>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>

    <slot />

</AppShell>