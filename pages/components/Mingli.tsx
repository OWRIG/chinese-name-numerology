import React from "react";

interface IProps {
	wuxing: string;
}

export default function Mingli(props: IProps) {
	const { wuxing } = props;

	const WXArr = ["金", "木", "水", "火", "土"];
	const wuxingArr = wuxing.split("");

	const 缺 = WXArr.filter((item) => !wuxingArr.includes(item));

	const getRes = (缺: string[]) => {
		if (缺.length === 0) {
			return "命中无缺";
		} else if (缺.length === 5) {
			return "命中全缺";
		} else {
			return `命中缺${缺.join("、")}`;
		}
	};

	return <div>{`鉴定为 ${getRes(缺)}`}</div>;
}
