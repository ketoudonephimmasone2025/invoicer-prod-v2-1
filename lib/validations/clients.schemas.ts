import z from "zod";

export const clientSchema = z
	.object({
		name: z.string().min(1).trim(),
		email: z.preprocess((val) => (val === "" ? undefined : val), z.string().email().optional()),
		company: z.string().trim().optional().nullable(),
		phone: z.string().trim().optional().nullable(),
		file: z.instanceof(File).optional().nullable(),
	})
	.strict();

export const clientUpdateSchema = clientSchema.partial();

export type CreateClientInputsType = z.infer<typeof clientSchema>;

export type UpdateClientInputsType = z.infer<typeof clientUpdateSchema>;
