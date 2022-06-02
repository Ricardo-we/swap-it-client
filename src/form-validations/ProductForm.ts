import * as yup from 'yup';

export const ProductFormSchema = yup.object({
    name: yup.string().required(),
    description: yup.string(),
    aproximate_price: yup.number().required(),
    possible_interchanges: yup.string(),
    images: yup.array().notRequired(),
    tags: yup.array().notRequired()
});

// product = Product.objects.create(
//     user_id=user_id,
//     name=request.data['name'],
//     description=request.data.get('description'),
//     aproximate_price=request.data['aproximate_price'],
//     possible_interchanges=request.data.get('possible_interchanges')
// )
// for image in request.FILES.getlist('product_images'):
//     ProductImage.objects.create(product=product,image=image)
