import { getAllInvoicesAction } from "@/actions/invoices.actions";
import InvoicesPageFront from "@/components/InvoicesPageFront";
import { normalizePagination } from "@/lib/pagination/pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Invoices | Invoicer",
	description: "Manage your invoices",
};

const InvoicesPage = async ({ searchParams }: { searchParams: Promise<{ page?: string; limit?: string }> }) => {
	const { page, limit } = await searchParams;

	const { safePage, safeLimit } = normalizePagination(page, limit);

	const data = await getAllInvoicesAction({ page: safePage, limit: safeLimit });

	return <InvoicesPageFront invoices={data.data} meta={data.meta} stats={data.stats} />;
};

export default InvoicesPage;
