import {z} from "zod";
export const ProfileInformationFormValidation = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    email: z.string().email('Incorrect email address'),
});

