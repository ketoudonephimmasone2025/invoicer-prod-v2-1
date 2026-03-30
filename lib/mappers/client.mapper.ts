import { ClientDTO } from "@/types";
import { Client } from "@prisma/client";

//We use this function has mapper to transform a Client from DB/prisma to a DTO (safe version)
export function toClientDTO(client: Client): ClientDTO {
	return {
		id: client.id,
		name: client.name,
		email: client.email,
		avatarUrl: client.avatarUrl,
		createdAt: client.createdAt,
		company: client.company,
		phone: client.phone,
	};
}
