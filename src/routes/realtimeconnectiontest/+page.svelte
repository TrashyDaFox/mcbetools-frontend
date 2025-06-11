<script>
	import axios from "axios";
	import config from "../config";
	import { writable } from "svelte/store";
	import { onMount } from "svelte";

    function httpToWs(url) {
        return url.replace(/^http/, 'ws');
    }

    let connected = writable(false)
    let received = writable(0)
    let sent = writable(0)
    let logs = writable([]);

    onMount(()=>{
        let ws = new WebSocket(httpToWs(`${config.apiEndpoint}/ws-testing`))
        let interval = null;
        ws.onmessage = (data)=>{
            logs.set([...$logs, `Received: ${data.data}`])
            received.set($received + 1)
        }
        ws.onopen = ()=>{
            connected.set(true)
            function intervalFunc() {
                if($sent == 68) {
                if(interval) clearInterval(interval)//
                }
                ws.send('Testy')
                sent.set($sent + 1)
                logs.set([...$logs, `Sent: Testy`])
            }
            interval = setInterval(intervalFunc, 1000 / 69)

        }
        return ()=>{
            if(interval) clearInterval(interval)
        }
    })
</script>
{#if $connected}
    <p style="color: lime;">Connected!</p>
{:else}
    <p style="color: red;">Not Connected :&lt;</p>
{/if}
<hr>
<p>{$sent} sent, {$received} received</p>
<hr>
<p>========== Logs ==========</p>
<pre>{$logs.join('\n')}</pre>