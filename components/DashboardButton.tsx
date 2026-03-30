"use client";

import { useRouter } from "next/navigation";

const DashboardButton = () => {
	const router = useRouter();

	const handleClick = () => {
		router.push("/dashboard");
	};

	return (
		<button
			onClick={handleClick}
			className="ml-8 py-1 w-32 bg-stone-400 dark:bg-gray-200 text-black rounded-lg cursor-pointer transition-transform hover:bg-stone-700 hover:text-white hover:dark:bg-gray-500 hover:dark:text-black"
		>
			Dashboard
		</button>
	);
};

export default DashboardButton;
