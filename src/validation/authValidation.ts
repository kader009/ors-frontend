import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  username: z.string().min(5, 'Full name must be at least 5 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.string().min(1, 'Please select a role'),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;
