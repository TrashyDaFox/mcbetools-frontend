<script lang="ts">
    import axios from 'axios';
    import config from '../../../config';
    import { getModalStore } from '@skeletonlabs/skeleton';
    const modalstore = getModalStore();
    // @ts-ignore
    function promoteUser(role, handle) {
        axios({
                        method: "post",
                        url: `${config.apiEndpoint}/account/promote/`,
                        data: {
                            handle: handle,
                            role: role
                        },
                        headers: {
                            Authorization: localStorage.getItem('sessionToken')
                        }
                    }).then(res=>{
                        
                    })
    }
    </script>
    
    <div class="card bg-initial p-4 py-8 justify-center items-center">
        <button class="btn variant-filled">Co-Owner</button>
        <button class="btn variant-filled">Admin</button>
        <button class="btn variant-filled">Mod</button>
        <button class="btn variant-filled">Demote</button>
    </div>