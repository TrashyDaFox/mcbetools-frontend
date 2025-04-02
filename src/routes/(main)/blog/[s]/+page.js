// import { error } from '@sveltejs/kit';
// /** @type {import('./$types').PageLoad} */
// export function load({ params }) {
// 	return {url: params.url}
// }
import axios from 'axios';
import { error } from '@sveltejs/kit';
import config from '../../../config';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
        const response = await axios.get(`${config.apiEndpoint}/blog-posts/${params.s}`);
        
        const handle = await axios.get(`${config.apiEndpoint}/id-to-handle/${response.data.author}`)
        const profile = await axios.get(`${config.apiEndpoint}/user-profile/${handle.data.handle}`)	
        return { data: response.data, url: params.s, profile: profile.data.userData }; // Adjust the key according to your needs
	} catch (err) {
		// if(response.data.error) {
			throw error(404, `Project not found\n${err} ${err.stack}`);
		// }
		// throw error(500, 'Failed to fetch data');
	}
}
