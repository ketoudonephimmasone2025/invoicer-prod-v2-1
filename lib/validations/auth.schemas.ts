import z from "zod";

const baseAuthSchema = z.object({
	email: z.string().email().trim().toLowerCase(),
	password: z.string().min(6),
});

export const loginSchema = baseAuthSchema;

export const registerSchema = baseAuthSchema.extend({
	name: z.preprocess((val) => (val === "" ? undefined : val), z.string().min(2).max(50).trim().optional()),
});

export type RegisterInputsType = z.infer<typeof registerSchema>;

export type LoginInputsType = z.infer<typeof loginSchema>;
