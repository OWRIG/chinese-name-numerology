import React from "react";
import { List } from "@mantine/core";
import dayjs from "dayjs";
// @ts-ignore
import calendar from "js-calendar-converter";
import { calcHour, getCalc } from "@/utils/bazi";
import Mingli from "./Mingli";

interface IGossipPlateProps {
	date: Date | null;
}

export default function GossipPlate(props: IGossipPlateProps) {
	const { date } = props;
	if (!date) return null;
	const year = dayjs(date).year();
	const month = dayjs(date).month();
	const day = dayjs(date).date();
	const hour = dayjs(date).hour();
	const baziRes = getCalc(date);
	const lunarRes = calendar.solar2lunar(year, month + 1, day, hour);
	const 公历 = dayjs(date).format("YYYY年MM月DD日 HH时");
	const 农历 = `${lunarRes.gzYear}年${lunarRes.gzMonth}月${
		lunarRes.gzDay
	}日  ${calcHour(hour)}时`;
	const 八字 = baziRes.baZi;
	const 五行 = baziRes.wuXing;
	const 方位 = baziRes.fangWei;

	return (
		<div className="mt-12">
			<List>
				<List.Item>公历: {公历}</List.Item>
				<List.Item>农历: {农历}</List.Item>
				<List.Item>八字: {八字}</List.Item>
				<List.Item>五行: {五行}</List.Item>
				<List.Item>方位: {方位}</List.Item>
			</List>
			<Mingli wuxing={五行} />
		</div>
	);
}
