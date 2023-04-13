import { useState } from "react";
import DatePicker from "./components/DatePicker";
import GossipPlate from "./components/GossipPlate";

export default function Home() {
	const [date, setDate] = useState<Date | null>(null);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono not-italic lg:flex">
				<div className="w-full h-full flex flex-col items-center">
					<h1 className="text-2xl font-bold">命格推断计算器</h1>
					<DatePicker date={date} setDate={setDate} />
					<GossipPlate date={date} />
				</div>
			</div>
		</main>
	);
}
