import { UserInStorage } from "../interfaces/User";

export const API_URL = 'https://api-swapit.herokuapp.com/api';
export const HEADERS = (user: UserInStorage) => ({ 'Authorization': `Token ${user.auth_token}` });