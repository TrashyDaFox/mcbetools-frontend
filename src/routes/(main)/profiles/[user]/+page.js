// import { error } from '@sveltejs/kit';
// /** @type {import('./$types').PageLoad} */
// export function load({ params }) {
// 	return {user: params.user}
// }

import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const user = params.user;

  // Redirect to the /@[user] path
  throw redirect(302, `/@${user}`);
}
