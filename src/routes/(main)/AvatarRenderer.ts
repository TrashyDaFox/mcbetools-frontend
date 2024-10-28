import { Avatar } from '@skeletonlabs/skeleton';
// @ts-ignore
import Identicon from 'identicon.js';
import config from '../config';

export function getUserAvatar(user:any) {
    function textToHex(text: string) {
        let hex = text.split('').map(_=>{
            return _.charCodeAt(0).toString(16)
        }).join('')
        if(hex.length < 15) {
            return `5cedaf0abc4a5a9efd0126a9${hex}`
        } else {
            return `${hex}`
        }
    }
    return user.avatarURL ? `${config.apiEndpoint}${user.avatarURL}` : `data:image/png;base64,${new Identicon(textToHex(user.handle)).toString()}`
}