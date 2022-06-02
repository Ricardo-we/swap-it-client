interface formDataField {
	name: string;
	value: string | Blob | File | Array<string | number> | any;
	imageName?: any;
}

export default function formDataMaker(fields: Array<formDataField>) {
	const formData = new FormData();

	for (const field of fields) {
		const baseConditions = field.name && field.value ? true : false;
		const isFile = field.value instanceof FileList;
		const isArray = field.value instanceof Array;

		if (baseConditions && isFile && !isArray && field.imageName) {
			formData.append(field.name, field.value, field.imageName);
		}
		else if (baseConditions && !isFile && !isArray) {
			formData.append(field.name, field.value);
		}
		else if (baseConditions && !isFile && isArray) {
			for (const item of field.value) {
				formData.append(field.name, item?.toString());
			}
		}
		else if (baseConditions && isFile && field.value.length > 0) {
			for (const item of field.value) {
				formData.append(field.name, item, item.name);
			}
		}
	}
	return formData;
}
