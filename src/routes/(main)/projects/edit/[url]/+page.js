import { error } from '@sveltejs/kit';
import axios from 'axios';
import config from '../../../../config';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		const response = await axios.get(`${config.apiEndpoint}/valid-tags`);
		return {
			url: params.url,
			tags: response.data
		};
	} catch (err) {
		throw error(500, 'Failed to fetch valid tags');
	}
}