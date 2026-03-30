import { getOneClientAction } from "@/actions/clients.actions";
import ClientForm from "@/components/ClientForm";

const ClientPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	const client = await getOneClientAction({ id });

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold">Client details</h1>
			<ClientForm mode="edit" client={client} />
		</div>
	);
};

export default ClientPage;
