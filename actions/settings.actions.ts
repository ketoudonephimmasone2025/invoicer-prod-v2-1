"use server";

import { requireUser } from "@/lib/auth/requireUser";
import { processAvatarFile } from "@/lib/filesystem/image-processor";
import { toUserDTO } from "@/lib/mappers/user.mapper";
import { prisma } from "@/lib/prisma";
import { profileSchema } from "@/lib/validations/settings.schemas";
import { UserDTO } from "@/types";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";

//This action redirects to / if no token or no user registered
export async function getProfileAction(): Promise<UserDTO> {
	//User guard
	const user = await requireUser();
	//Get user from db
	const dbUser = await prisma.user.findUnique({ where: { id: user.userId } });
	if (!dbUser) {
		redirect("/");
	}
	//Mapper
	const profile = toUserDTO(dbUser);
	//Return
	return profile;
}

export async function patchProfileAction({ name, password, file }: { name: string; password: string; file: File | null }): Promise<UserDTO> {
	//User guard
	const user = await requireUser();
	//SafeParse zod
	const safeParse = profileSchema.safeParse({ name, password });
	if (!safeParse.success) {
		throw new Error("Invalid inputs");
	}
	//Save avatar image in the public folder(or later on supabase storage)
	const avatarUrl = await processAvatarFile("user", file);
	//Craft update data
	const updateData: { name?: string; password?: string; avatarUrl?: string } = { name: safeParse.data.name, ...(avatarUrl ? { avatarUrl } : {}) };
	if (safeParse.data.password) {
		updateData.password = await hash(safeParse.data.password, 10);
	}
	//DB entity patch
	const updatedUser = await prisma.user.update({
		where: { id: user.userId },
		data: updateData,
	});
	//Mapper
	const updatedProfile = toUserDTO(updatedUser);
	//Return updatedUser
	return updatedProfile;
}
