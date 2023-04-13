import React from "react";
// @ts-ignore
import { DateInput, DatesProvider } from "@mantine/dates";

interface IDatePickerProps {
	date: Date | null;
	setDate: (date: Date) => void;
}

export default function DatePicker(props: IDatePickerProps) {
	const { date, setDate } = props;

	const nowDate = new Date();

	return (
		<div className="mt-20">
			<DatesProvider settings={{ locale: "zh-cn" }}>
				<DateInput
					maxDate={nowDate}
					onChange={setDate}
					className="w-96"
					valueFormat="YYYY/MM/DD HH:mm"
					placeholder="请在这里输入您的出生年月日时"
					radius="md"
					size="lg"
					mx="auto"
				/>
			</DatesProvider>
		</div>
	);
}
