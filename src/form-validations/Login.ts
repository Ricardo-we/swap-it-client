import * as yup from 'yup';

export const LoginSchema = yup.object({
    username: yup.string().max(150).min(3).matches(/[\w\d_-]{3,150}/g, "Username does not match requested pattern"),
    password: yup.string().max(150).min(8).matches(/(?=.*[&#$%\-_])[\s\w&#$%\-_]{8,150}/g),
})

export const SignUpSchema = yup.object({
    username: yup.string().max(150).min(3),
    password: yup.string().max(150).min(8).matches(/(?=.*[&#$%\-_])[\s\w&#$%\-_]{8,150}/g),
    email: yup.string().email(),
    phone_number: yup.string().notRequired().min(8, "Min numbers: 8").max(20, "Max numbers: 20").matches(/[0-9+]/g, "Phone number does not match requested pattern"),
    location: yup.string()
})