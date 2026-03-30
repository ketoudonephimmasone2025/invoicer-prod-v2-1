export const safeLogger = (error: unknown) => {
	if (process.env.NODE_ENV === "development") {
		console.log("SAFE DEV LOGS");
		console.log(error);
	}
};
