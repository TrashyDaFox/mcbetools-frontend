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
		const response = await axios.get(`${config.apiEndpoint}/proj/${params.url}`);
		const handle = await axios.get(`${config.apiEndpoint}/id-to-handle/${response.data.project.author}`)
		const profile = await axios.get(`${config.apiEndpoint}/user-profile/${handle.data.handle}`)
		return { data: response.data.project, url: params.url, profile: profile.data.userData }; // Adjust the key according to your needs
	} catch (err) {
		throw error(500, 'Failed to fetch data');
	}
}
