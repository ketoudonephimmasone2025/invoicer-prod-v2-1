"use client";

import { useAppStore } from "@/store/app.store";
import { Menu } from "lucide-react";

const BurgerButton = () => {
	const toggle = useAppStore((store) => store.toggleOpen);

	return (
		<div
			onClick={toggle}
			className="absolute top-4 left-4 rounded-full border-2 p-2 hover:bg-stone-400 hover:dark:bg-stone-400 hover:dark:text-black cursor-pointer"
		>
			<Menu />
		</div>
	);
};
export default BurgerButton;
