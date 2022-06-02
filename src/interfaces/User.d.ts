export default interface User {
    id: number
    username: string
    password?: string
    email?: string
    location?: string
    user_currency?: string
    phone_number?: string
}

export interface UserInStorage {
    auth_token: string
    user: User    
}