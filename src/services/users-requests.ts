import { API_URL, HEADERS } from "./requests-config";
import axios from 'axios';
import User, { UserInStorage } from "../interfaces/User";

const ENDPOINT = `${API_URL}/users`

export async function getUserLocation(){
    const response = await axios.get('http://ip-api.com/json/');
    localStorage.setItem('swapit-location', JSON.stringify(response.data));
    return response.data.country;
}

export async function loginRequest({ username, password }: User | any){
    const response = await axios.post(`${ENDPOINT}/login`, { username, password })
    if(response.data.error) throw new Error(response.data.error)
    return response.data;
}

export async function updateUserRequest(user: UserInStorage,fullUserData: User | any){
    const response = await axios.put(`${ENDPOINT}/${user.user.id}`, fullUserData, { headers:HEADERS(user)})
    if(response.data.error) throw new Error(response.data.error)
    return response.data;
}


export async function signUpRequest(fullUserData: User | any){
    const response = await axios.post(`${ENDPOINT}/sign-up`, fullUserData)
    if(response.data.error) throw new Error(response.data.error)
    return response.data;
}

export async function confirmationCodeRequest(verificationCode: number,fullUserData: User | any){
    const response = await axios.post(`${ENDPOINT}/sign-up/confirm/${verificationCode}`, fullUserData)
    if(response.data.error) throw new Error(response.data.error)
    return response.data;
}