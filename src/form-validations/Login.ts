import * as yup from 'yup';

export const LoginSchema = yup.object({
    username: yup.string().max(150).min(3),
    password: yup.string().max(150).min(8).matches(/(?=.*[&#\$%\-_])[\s\w&#\$%\-_]{8,150}/g),
})

export const SignUpSchema = yup.object({
    username: yup.string().max(150).min(3),
    password: yup.string().max(150).min(8).matches(/(?=.*[&#\$%\-_])[\s\w&#\$%\-_]{8,150}/g),
    email: yup.string().email(),
    phone_number: yup.string().matches(/[0-9+]/),
    location: yup.string()
})