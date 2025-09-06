<script>
	import Calendar from "$lib/Calendar.svelte";
	import axios from "axios";
	import config from "../../config";

</script>
<div class="p-4 w-full flex items-center justify-center">
	<Calendar minDate={new Date()}/>

</div>
<div class="h-8"></div>

<button class="variant-filled-primary btn" on:click={()=>{
	axios.get(`${config.apiEndpoint}/test-notifs`, {headers: {
		Authorization: localStorage.getItem("sessionToken")
	}}).then(()=>{

	})
}}>Test</button>

<button class="variant-filled-primary btn" on:click={async ()=>{
const reg = await navigator.serviceWorker.ready;
await reg.update(); // this fetches the new file
alert("Refreshed")
}}>Update service worker</button>


<div class="flex gap-4 p-4 flex-wrap">
<!-- QUATERNARY -->
<div class="btn variant-filled-quaternary flex-auto">QUATERNARY</div>
<div class="btn variant-soft-quaternary flex-auto">QUATERNARY</div>
<div class="btn variant-ghost-quaternary flex-auto">QUATERNARY</div>

<!-- QUINARY -->
<div class="btn variant-filled-quinary flex-auto">QUINARY</div>
<div class="btn variant-soft-quinary flex-auto">QUINARY</div>
<div class="btn variant-ghost-quinary flex-auto">QUINARY</div>

<!-- SENARY -->
<div class="btn variant-filled-senary flex-auto">SENARY</div>
<div class="btn variant-soft-senary flex-auto">SENARY</div>
<div class="btn variant-ghost-senary flex-auto">SENARY</div>

<!-- SEPTENARY -->
<div class="btn variant-filled-septenary flex-auto">SEPTENARY</div>
<div class="btn variant-soft-septenary flex-auto">SEPTENARY</div>
<div class="btn variant-ghost-septenary flex-auto">SEPTENARY</div>

<!-- OCTONARY -->
<div class="btn variant-filled-octonary flex-auto">OCTONARY</div>
<div class="btn variant-soft-octonary flex-auto">OCTONARY</div>
<div class="btn variant-ghost-octonary flex-auto">OCTONARY</div>

<!-- NONARY -->
<div class="btn variant-filled-nonary flex-auto">NONARY</div>
<div class="btn variant-soft-nonary flex-auto">NONARY</div>
<div class="btn variant-ghost-nonary flex-auto">NONARY</div>

</div>