"use server";

import { requireUser } from "@/lib/auth/requireUser";
import { toClientDTO } from "@/lib/mappers/client.mapper";
import { prisma } from "@/lib/prisma";
import { SearchClient, SearchInvoice, SearchResponse } from "@/types";

export async function searchAction(queryParam: string): Promise<SearchResponse> {
	//Check user
	const user = await requireUser();
	//Extract and prepare query term
	let query = queryParam?.trim() ?? "";
	if (!query) {
		return { clients: [], invoices: [] };
	}
	query = query.toLowerCase();
	const numberizedQuery = Number(query);
	const isQueryANumber = !isNaN(numberizedQuery);
	//If all fine, look for clients and invoices
	const [clientsRaw, invoicesRaw] = await Promise.all([
		prisma.client.findMany({
			where: {
				userId: user.userId,
				OR: [{ name: { contains: query, mode: "insensitive" } }, { email: { contains: query, mode: "insensitive" } }],
			},
			orderBy: {
				createdAt: "desc",
			},
			take: 5,
		}),
		prisma.invoice.findMany({
			where: {
				userId: user.userId,
				OR: [
					...(isQueryANumber ? [{ number: numberizedQuery }] : []),
					{ client: { name: { contains: query, mode: "insensitive" } } },
					{ client: { email: { contains: query, mode: "insensitive" } } },
				],
			},
			orderBy: {
				createdAt: "desc",
			},
			take: 5,
			select: {
				id: true,
				number: true,
				client: {
					select: {
						name: true,
					},
				},
			},
		}),
	]);
	//Cook the answers
	const clients: SearchClient[] = clientsRaw.map((c) => toClientDTO(c));
	const invoices: SearchInvoice[] = invoicesRaw.map((i) => ({
		id: i.id,
		name: i.client.name,
		number: i.number,
	}));
	//Return
	return { clients, invoices };
}
