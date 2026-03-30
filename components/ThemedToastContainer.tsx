"use client";

import { useUiStore } from "@/store/ui.store";
import { ToastContainer } from "react-toastify";

const ThemedToastContainer = () => {
	const theme = useUiStore((store) => store.theme);

	return (
		<ToastContainer
			position="top-right"
			autoClose={500}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			pauseOnHover
			theme={theme}
		/>
	);
};
export default ThemedToastContainer;
