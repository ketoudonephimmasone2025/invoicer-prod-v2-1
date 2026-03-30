"use client";

import { logoutAction } from "@/actions/auth.actions";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Logout = () => {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await logoutAction();
			router.push("/");
			router.refresh(); //clean cache
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	return (
		<button onClick={handleLogout} className="w-full rounded text-left cursor-pointer px-4 py-2 hover:bg-stone-50 hover:text-blue-600 flex gap-x-1">
			<LogIn />
			<span className="hidden sm:inline">Logout</span>
		</button>
	);
};
export default Logout;
