import { getAllClientsAction } from "@/actions/clients.actions";
import ClientsPageFront from "@/components/ClientsPageFront";
import { normalizePagination } from "@/lib/pagination/pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Clients | Invoicer",
	description: "Clients overview",
};

const ClientsPage = async ({ searchParams }: { searchParams: Promise<{ page?: string; limit?: string }> }) => {
	const { page, limit } = await searchParams;

	const { safePage, safeLimit } = normalizePagination(page, limit);

	const data = await getAllClientsAction({ page: safePage, limit: safeLimit });

	return <ClientsPageFront clients={data.data} meta={data.meta} stats={data.stats} />;
};

export default ClientsPage;
