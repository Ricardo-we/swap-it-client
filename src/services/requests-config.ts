import { UserInStorage } from "../interfaces/User";

export const API_URL = 'http://localhost:8000/api';
export const HEADERS = (user: UserInStorage) => ({'Authorization': `Token ${user.auth_token}`});