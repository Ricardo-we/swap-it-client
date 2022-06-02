import axios from "axios";
import { UserInStorage } from "../interfaces/User";
import { API_URL, HEADERS } from "./requests-config";
import UserContactInfo from "../interfaces/UserContactInfo";

const ENDPOINT = `${API_URL}/users/contact-info`;

export async function getUserContactInfoRequest(user: UserInStorage) {
    const response = await axios.get(`${ENDPOINT}/${user.user.id}`, {
        headers: HEADERS(user),
    });
    return response.data;
}

export async function addUserContactInfoRequest(
    user: UserInStorage,
    userContactInfo: UserContactInfo
) {
    const response = await axios.post(
        `${ENDPOINT}/${user.user.id}`,
        userContactInfo,
        { headers: HEADERS(user) }
    );
    return response.data;
}

export async function updateUserContactInfoRequest(
    user: UserInStorage,
    contactInfoId: number | string,
    userContactInfo: UserContactInfo
) {
    const response = await axios.put(
        `${ENDPOINT}/${user.user.id}/${contactInfoId}`,
        userContactInfo,
        { headers: HEADERS(user) }
    );
    return response.data;
}

export async function deleteContactInfoRequest(
    user: UserInStorage,
    contactInfoId: number | string
) {
    const response = await axios.delete(
        `${ENDPOINT}/${user.user.id}/${contactInfoId}`,
        { headers: HEADERS(user) }
    );
    return response.data;
}
