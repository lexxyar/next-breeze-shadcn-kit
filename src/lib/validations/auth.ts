import {z} from "zod";

export const LoginFormValidation = z.object({
    email: z.string().email('Incorrect email address'),
    password: z.string(),
    remember: z.boolean(),
})
export const ForgotPasswordFormValidation = z.object({
    email: z.string().email('Incorrect email address'),
})

export const RegisterFormValidation = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    email: z.string().email('Incorrect email address'),
    password: z.string().min(1, 'Password must be at least 8 characters'),
    password_confirmation: z.string().min(1, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});
export const PasswordResetFormValidation = z.object({
    email: z.string().email('Incorrect email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});
