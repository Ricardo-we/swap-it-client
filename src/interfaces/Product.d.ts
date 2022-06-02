import User from "./User"
import UserContactInfo from "./UserContactInfo";

export default interface Product {
    id?: number;
    user: User | number | string;
    tags?: Array<any>;
    images?: Array<ProductImage>
    name: string;
    description?: string;
    aproximate_price?: number;
    last_update?: string;
    possible_interchanges?: string
    reports?: Array<any>
    in_revision?: boolean
    currency?: string
    user_contact_info?: Array<UserContactInfo>;
}

export interface ProductControl {
    user: User | number | string;
    tags?: Array<any>;
    images?: Array<File>
    name: string;
    description?: string;
    aproximate_price: number;
    last_update?: string;
    possible_interchanges?: string
    reports?: Array<any>
    in_revision?: boolean
}

export interface ProductImage {
    id?: number 
    product?: number | string
    image: string 
}