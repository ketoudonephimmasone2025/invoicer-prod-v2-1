"use client";

import { StatsResponse } from "@/types";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const RevenueChart = ({ data }: { data: StatsResponse }) => {
	return (
		<div className="p-4 rounded-2xl shadow-2xl bg-white">
			<h1 className="text-lg font-semibold mb-4">Revenue</h1>
			<ResponsiveContainer width={"100%"} height={300}>
				<LineChart data={data?.revenueByMonth}>
					<XAxis dataKey={"month"} />
					<YAxis dataKey={"revenue"} />
					<Tooltip />
					<Line dataKey={"revenue"} type={"monotone"} stroke="#3b82f6" strokeWidth={3} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default RevenueChart;
