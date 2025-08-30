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