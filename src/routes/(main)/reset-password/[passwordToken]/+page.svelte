<script lang="ts">
    export let data;
    import axios from 'axios'
    import { getModalStore } from '@skeletonlabs/skeleton';
    import config from '../../../config';
    let password = '';
    let passwordToken = data.passwordToken;
    const modalStore = getModalStore();
    function changePassword() {
        axios.post(`${config.apiEndpoint}/auth/reset-password/step-2`, {
            password: password,
            passwordToken: passwordToken
        }).then((res) => {
            if(!res.data.error) {
            modalStore.trigger({
                type: 'alert',
                body: 'Password changed successfully'
            })
        } else {
            modalStore.trigger({
                type: 'alert',
                body: res.data.message
            })
        }
        }).catch((err) => {
            console.log(err)
        })
    }
</script>

<div style="
    background-image: url('/loginbg.png');
    background-size: cover;
    background-position: center;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;    
    align-items: center;
  ">
    <div class="items-center justify-center">
        <div class="rounded-lg variant-glass-surface" style="
  width: 300px; 
  padding: 30px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  text-align: center;
">
            <form>
            <input type='password' placeholder='New Password' bind:value={password} class="input" />
        </form>
        <div class="h-2"></div>
        <button class='btn variant-ghost-primary' on:click={changePassword}>Change Password</button>
        </div>
    </div>
</div>
