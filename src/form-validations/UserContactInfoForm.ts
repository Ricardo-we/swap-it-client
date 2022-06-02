import * as yup from 'yup';

const UserContactInfoSchema = yup.object({
    contact_type: yup.string().required().min(3).max(150),
    contact: yup.string().required().max(150)
})

export default UserContactInfoSchema;