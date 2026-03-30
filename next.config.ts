import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		serverActions: {
			bodySizeLimit: "5mb",
		},
	},
	images: {
		domains: ["bzbpsyxqddhvdkgrsoto.supabase.co"],
	},
};

export default nextConfig;
