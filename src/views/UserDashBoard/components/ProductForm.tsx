import React, { useState, useEffect } from "react";
import Product from "../../../interfaces/Product";
import FormControl, {
	FormControlTextArea,
} from "../../../components/FormControl";
import TagSelect from "../../../components/TagSelect";

interface ProductFormProps {
	defaults?: Product;
	formTitle?: string;
	buttonText?: string;
	onSubmit?: (
		product: object | any,
		files: any,
		tags: Array<any>
	) => void | any;
}

function ProductForm({
	defaults,
	onSubmit,
	buttonText,
	formTitle,
}: ProductFormProps) {
	const [formData, setFormData] = useState({});
	const [files, setFiles] = useState<any>();
	const [tags, setTags] = useState<Array<any>>([]);

	const handleFilesChange = (e: any) => setFiles(e.target.files);
	const handleChange = (e: any) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		onSubmit &&
			onSubmit(
				formData,
				files,
				tags.map((tag) => parseInt(tag?.value))
			).then(() => {
				if (!defaults) e.target.reset();
			});
	};

	useEffect(() => {
		if (defaults) setFormData((prev) => ({ ...prev, ...defaults }));
	}, [defaults]);

	return (
		<>
			<form className="form w-100 p-3" onSubmit={handleSubmit}>
				<h3>{formTitle}</h3>
				{/* TAGS */}
				<FormControl
					onChange={handleChange}
					name="name"
					alertMessage="Name is required"
					placeholder="Product name"
					required
					defaultValue={defaults?.name}
				/>
				<FormControlTextArea
					onChange={handleChange}
					name="description"
					placeholder="Description"
					defaultValue={defaults?.description}
					required
				/>
				<FormControl
					onChange={handleChange}
					name="aproximate_price"
					alertMessage="Aproximate price required"
					type="number"
					placeholder="Aproximate price"
					min="1"
					step="any"
					defaultValue={defaults?.aproximate_price}
					required
				/>
				<FormControlTextArea
					onChange={handleChange}
					name="possible_interchanges"
					placeholder="Possible interchanges"
					defaultValue={defaults?.possible_interchanges}
					required
				/>
				<TagSelect
					name="tags"
					// defaults={[2]}
					defaults={defaults?.tags && defaults?.tags?.map((tag) => ({ value: tag.id, label: tag.name }))}
					onChange={(data) => setTags(data)}
				/>
				<FormControl
					onChange={handleFilesChange}
					multiple
					accept="image/*"
					type="file"
				/>
				<button type="submit" className="btn btn-primary w-100">
					{buttonText || "Submit"}
				</button>
			</form>
		</>
	);
}

export default ProductForm;
