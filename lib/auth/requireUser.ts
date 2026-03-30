import { UserFromToken } from "@/types";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { JWT_SECRET } from "../config/config";
import { safeLogger } from "../logs/dev-logger";
import { redirect } from "next/navigation";

export const getUserFromCookies = async (): Promise<UserFromToken | null> => {
	const cookiesStore = await cookies();
	const token = cookiesStore.get("token")?.value;
	if (!token) return null;
	try {
		const decodedUser = verify(token, JWT_SECRET) as UserFromToken;
		return decodedUser;
	} catch (error) {
		safeLogger(error);
		return null;
	}
};

export async function requireUser(): Promise<UserFromToken> {
	const user = await getUserFromCookies();
	if (!user) {
		redirect("/login");
	}
	return user;
}
