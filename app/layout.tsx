import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemedToastContainer from "@/components/ThemedToastContainer";
import "react-toastify/dist/ReactToastify.css";
import ThemeHydrator from "@/components/ThemeHydrator";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Invoicer",
	description: "An application for freelancers to monitor their invoices and clients",
	icons: {
		icon: "/favicon.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} bg-white text-black dark:bg-gray-900 dark:text-white`}>
				<ThemeHydrator />
				<ThemedToastContainer />
				{children}
			</body>
		</html>
	);
}
