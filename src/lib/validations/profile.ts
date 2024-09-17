import {z} from "zod";

export const ProfileInformationFormValidation = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    email: z.string().email('Incorrect email address'),
});

export const ProfileChangePasswordFormValidation = z.object({
    current_password: z.string().min(1, 'Password must be at least 8 characters'),
    password: z.string().min(1, 'Password must be at least 8 characters'),
    password_confirmation: z.string().min(1, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});

export const DeleteProfileFormValidation = z.object({
    password: z.string().min(1, 'Password must be at least 8 characters'),
})
