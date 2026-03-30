import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
			{/* HEADER */}
			<header className="flex flex-wrap items-center justify-between px-8 py-4 border-b">
				<h1 className="text-xl font-bold">Invoicer</h1>
				<div className="flex gap-3">
					<Link
						href={"/login"}
						className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-800 transition"
					>
						Login
					</Link>
					<Link href={"/register"} className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition">
						Register
					</Link>
				</div>
			</header>
			{/* MAIN  */}
			<section className="relative min-h-[calc(100vh-70px)] flex-1 flex flex-col items-center justify-center text-center px-6 bg-stone-400 dark:bg-gray-200 dark:text-black">
				<Image src={"/freelancer.jpg"} alt="hero" fill className="object-cover object-center rounded-3xl opacity-80" priority />
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">Invoice smarter. Get paid faster.</h2>
					<p className="max-w-xl text-lg text-white dark:text-gray-700 mb-8">
						Invoicer helps freelancers track clients, manage invoices and monitor payments in one simple dashboard
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Link
							href={"/register"}
							className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
						>
							Start free
						</Link>
						<Link
							href={"/login"}
							className="px-6 py-3 border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white transition dark:border dark:border-black dark:text-black"
						>
							Welcome back
						</Link>
					</div>
				</div>
			</section>
			{/* FEATURES  */}
			<section className="px-8 py-16 bg-gray-50 dark:bg-gray-900">
				<div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
					<div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow">
						<h3 className="font-semibold mb-2">Clients</h3>
						<p className="text-sm text-gray-600 dark:text-gray-300">Manage all your clients in one place.</p>
					</div>
					<div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow">
						<h3 className="font-semibold mb-2">Invoices</h3>
						<p className="text-sm text-gray-600 dark:text-gray-300">Create and track invoices easily.</p>
					</div>
					<div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow">
						<h3 className="font-semibold mb-2">Analytics</h3>
						<p className="text-sm text-gray-600 dark:text-gray-300">Visualize your revenue and payments status.</p>
					</div>
				</div>
			</section>
			{/* FOOTER  */}
			<footer className="text-center text-sm py-6 border-t text-gray-500">
				@{new Date().getFullYear()} Invoicer - Built for freelancers
			</footer>
		</div>
	);
}
