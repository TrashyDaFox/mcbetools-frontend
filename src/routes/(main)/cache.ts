import axios from "axios";
import config from "../config";

// cache.js (make this a global/shared file)
export const userCache = new Map();

export async function getUserData(authorId: string) {
    if (userCache.has(authorId)) {
        return userCache.get(authorId);
    }

    // fetch handle
    const { data: handleData } = await axios.get(`${config.apiEndpoint}/id-to-handle/${authorId}`);
    // fetch user profile
    const { data: profileData } = await axios.get(`${config.apiEndpoint}/user-profile/${handleData.handle}`);

    userCache.set(authorId, profileData.userData);
    return profileData.userData;
}