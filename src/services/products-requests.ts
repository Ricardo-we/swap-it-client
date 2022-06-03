import axios from "axios";
import { UserInStorage } from "../interfaces/User";
import { ProductControl } from "../interfaces/Product";
import { API_URL, HEADERS } from "./requests-config";
import formDataMaker from "../utils/formdata-maker";

const ENDPOINT = `${API_URL}/products`;

const productFormDataMaker = (product: ProductControl) => {
	const formData: Array<any> = [
		{ name: "name", value: product.name },
		{ name: "aproximate_price", value: product.aproximate_price },
		{ name: "description", value: product.description },
		{ name: "possible_interchanges", value: product.possible_interchanges },
		{ name: "tags", value: product?.tags },
		{
			name: "product_images",
			value: product?.images,
		}
	];
	return formDataMaker(formData);
};

// PRODUCT BASE CRUD
export async function getProductsRequest(filterParams?: {
	query: string;
	value: string | number;
}) {
	let url = `${ENDPOINT}`;
	if (filterParams) url += `?${filterParams.query}=${filterParams.value}`;
	const response = await axios.get(url);
	return response.data;
}

export async function addProductRequest(
	user: UserInStorage,
	product: ProductControl,
) {
	const formData = productFormDataMaker(product);
	const response = await axios.post(
		`${ENDPOINT}/${user.user.id}/add`,
		formData,
		{ headers: HEADERS(user) },
	);
	return response.data;
}

export async function updateProductRequest(
	user: UserInStorage,
	productId: number,
	product: ProductControl,
) {
	const formData = productFormDataMaker(product);
	const response = await axios.put(
		`${ENDPOINT}/${user.user.id}/${productId}`,
		formData,
		{ headers: HEADERS(user) },
	);
	return response.data;
}

export async function deleteProductRequest(
	user: UserInStorage,
	productId: number | string,
) {
	const response = await axios.delete(
		`${ENDPOINT}/${user.user.id}/${productId}`,
		{ headers: HEADERS(user) },
	);
	return response.data;
}

// EXTRAS
export async function addProductImage(user: UserInStorage, image: File) {
	const formData = new FormData();
	formData.append("product_image", image, image.name);
	const response = await axios.post(
		`${ENDPOINT}/images/${user.user.id}/add`,
		formData,
		{ headers: HEADERS(user) },
	);
	return response.data;
}

export async function deleteProductImageRequest(
	user: UserInStorage,
	image_id: number | string,
	afterDelete?: () => any,
) {
	const response = await axios.delete(
		`${ENDPOINT}/images/${user.user.id}/${image_id}`,
		{ headers: HEADERS(user) },
	);
	afterDelete && afterDelete();
	return response.data;
}

export async function reportProductRequest(
	user: UserInStorage,
	product_id: number | string,
	report_reason: string,
) {
	const response = await axios.post(
		`${ENDPOINT}/report/${user.user.id}/${product_id}`,
		{ report_reason },
		{ headers: HEADERS(user) },
	);
	return response.data;
}

// SUPERUSER-ACTIONS
export async function deleteProductAsSuperUserRequest(
	user: UserInStorage,
	productId: number | string,
) {
	const response = await axios.delete(
		`${ENDPOINT}/${user.user.id}/${productId}/as-superuser`,
		{ headers: HEADERS(user) },
	);
	return response.data;
}
