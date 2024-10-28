import { error } from '@sveltejs/kit';
import axios from 'axios';
import config from '../../config';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let res = await axios.get(`${config.apiEndpoint}/get-project-by-url/${params.url}`)
    return {
        url: params.url,
        project: res.data.project
    }
}