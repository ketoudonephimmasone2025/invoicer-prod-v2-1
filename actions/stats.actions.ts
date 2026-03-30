import { requireUser } from "@/lib/auth/requireUser";
import { prisma } from "@/lib/prisma";
import { CountByStatus, RevenueByClient, RevenueByMonth, StatsResponse } from "@/types";

export async function statsAction(): Promise<StatsResponse> {
	//User guard
	const user = await requireUser();
	//Date now - 30 days ago
	const thirstyDaysAgo = new Date();
	thirstyDaysAgo.setDate(thirstyDaysAgo.getDate() - 30);
	//Cook the totals first - for the KPIs
	const [totalRevenueAgg, totalInvoices, totalClients, pendingRevenueAgg] = await Promise.all([
		prisma.invoice.aggregate({ where: { userId: user.userId, status: "PAID" }, _sum: { amount: true } }),
		prisma.invoice.count({ where: { userId: user.userId } }),
		prisma.client.count({ where: { userId: user.userId } }),
		prisma.invoice.aggregate({ where: { userId: user.userId, status: { in: ["SENT", "OVERDUE"] } }, _sum: { amount: true } }),
	]);
	//Cook monthly revenues
	const invoices = await prisma.invoice.findMany({ where: { userId: user.userId, status: "PAID" }, select: { amount: true, createdAt: true } });
	const revenueByMonthMap: Record<string, number> = {};
	invoices.forEach((invoice) => {
		const month = new Date(invoice.createdAt).toLocaleString("en-US", { month: "short" });
		revenueByMonthMap[month] = (revenueByMonthMap[month] || 0) + invoice.amount;
	});
	const revenueByMonth: RevenueByMonth[] = Object.entries(revenueByMonthMap).map(([month, revenue]) => ({ month, revenue: Number(revenue.toFixed(2)) }));
	//Invoices count per status
	const invoicesByStatusRaw = await prisma.invoice.groupBy({ by: ["status"], where: { userId: user.userId }, _count: { status: true } });
	const invoicesByStatus: CountByStatus[] = invoicesByStatusRaw.map((item) => ({
		status: item.status,
		count: item._count.status,
	}));
	//Top clients
	const topClientsRaw = await prisma.invoice.groupBy({
		where: { userId: user.userId, status: "PAID" },
		by: ["clientId"],
		_sum: { amount: true },
		orderBy: {
			_sum: { amount: "desc" },
		},
		take: 5,
	});
	const clientsIds = topClientsRaw.map((item) => item.clientId);
	const clients = await prisma.client.findMany({ where: { id: { in: clientsIds } }, select: { id: true, name: true } });
	const topClients: RevenueByClient[] = topClientsRaw.map((client) => {
		const fullClient = clients.find((item) => item.id === client.clientId);
		return {
			name: fullClient?.name ?? "Unknown",
			revenue: client._sum.amount ?? 0,
		};
	});
	//Return response
	return {
		totalRevenue: totalRevenueAgg._sum.amount ?? 0,
		totalInvoices,
		totalClients,
		revenueByMonth,
		countByStatus: invoicesByStatus,
		revenueByClient: topClients,
		pendingRevenue: pendingRevenueAgg._sum.amount ?? 0,
	};
}
