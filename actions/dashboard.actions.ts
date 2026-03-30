"use server";

import { requireUser } from "@/lib/auth/requireUser";
import { prisma } from "@/lib/prisma";
import { DashboardResponse } from "@/types/dashboard.types";
import { InvoiceWithClient } from "@/types/invoices.types";

export async function dashboardAction(): Promise<DashboardResponse> {
	//Check user
	const user = await requireUser();

	//Parallel queries
	const [totalInvoices, clientsCount, revenueAgg, pendingAgg, overdueAgg, latestInvoicesRaw] = await Promise.all([
		prisma.invoice.count({ where: { userId: user.userId } }),
		prisma.client.count({ where: { userId: user.userId } }),
		prisma.invoice.aggregate({ where: { userId: user.userId, status: "PAID" }, _sum: { amount: true } }),
		prisma.invoice.aggregate({ where: { userId: user.userId, status: "SENT" }, _sum: { amount: true } }),
		prisma.invoice.aggregate({ where: { userId: user.userId, status: "OVERDUE" }, _sum: { amount: true } }),
		prisma.invoice.findMany({
			where: { userId: user.userId },
			orderBy: { createdAt: "desc" },
			take: 5,
			select: {
				id: true,
				number: true,
				amount: true,
				status: true,
				clientId: true,
				dueDate: true,
				createdAt: true,
				client: {
					select: {
						id: true,
						name: true,
						email: true,
						avatarUrl: true,
					},
				},
			},
		}),
	]);

	//Transform data
	const latestInvoices: InvoiceWithClient[] = latestInvoicesRaw.map((item) => ({
		invoiceDetails: {
			id: item.id,
			number: item.number,
			amount: item.amount,
			dueDate: item.dueDate,
			status: item.status,
			clientId: item.clientId,
			createdAt: item.createdAt,
		},
		invoiceClient: {
			id: item.client.id,
			name: item.client.name,
			email: item.client.email,
			avatarUrl: item.client.avatarUrl,
		},
	}));

	//Return
	return {
		totalInvoices,
		clientsCount,
		revenue: revenueAgg._sum.amount ?? 0,
		pending: pendingAgg._sum.amount ?? 0,
		overdue: overdueAgg._sum.amount ?? 0,
		latestInvoices,
	};
}
