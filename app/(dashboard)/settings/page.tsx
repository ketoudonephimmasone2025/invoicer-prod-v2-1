import AppearanceCard from "@/components/AppearanceCard";
import ProfileCard from "@/components/ProfileCard";
import Title from "@/components/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Profile | Invoicer",
	description: "Your profile settings",
};

const SettingsPage = () => {
	return (
		<div className="pl-2">
			<Title text="Settings" sub="Manage your settings" />
			<div className="flex flex-col gap-y-6">
				<ProfileCard />
				<AppearanceCard />
			</div>
		</div>
	);
};
export default SettingsPage;
