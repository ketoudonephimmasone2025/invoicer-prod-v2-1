import ClientForm from "@/components/ClientForm";

const NewClientPage = () => {
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold">New client</h1>
			<ClientForm mode="create" />
		</div>
	);
};

export default NewClientPage;
