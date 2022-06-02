import axios from "axios";
import { UserInStorage } from "../interfaces/User";
import { API_URL, HEADERS } from "./requests-config";

const ENDPOINT = `${API_URL}/tags`;

export async function getTagsRequest() {
    const response = await axios.get(ENDPOINT);
    return response.data
}

export async function addTagRequest(user: UserInStorage, tagData: { name: string }) {
    const response = await axios.post(`${ENDPOINT}/${user.user.id}`, tagData, { headers: HEADERS(user) })
    return response.data
}

export async function updateTagRequest(user: UserInStorage, tagId: number | string, tagData: { name: string }) {
    const response = await axios.put(`${ENDPOINT}/${user.user.id}/${tagId}`, tagData, { headers: HEADERS(user) })
    return response.data
}

export async function deleteTagRequest(user: UserInStorage, tagId: number | string) {
    const response = await axios.delete(`${ENDPOINT}/${user.user.id}/${tagId}`, { headers: HEADERS(user) })
    return response.data
}