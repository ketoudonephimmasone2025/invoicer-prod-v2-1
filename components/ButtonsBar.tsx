import BackButton from "./BackButton";
import DashboardButton from "./DashboardButton";

const ButtonsBar = () => {
	return (
		<div className="flex flex-wrap items-center justify-start gap-x-2 py-4 bg-stone-300 dark:bg-gray-400 gap-y-4">
			<BackButton />
			<DashboardButton />
		</div>
	);
};
export default ButtonsBar;
