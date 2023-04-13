/**
 * Created by mawei & RIG on 2017/5/29 、 2023/4/13.
 */

const Gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const Zhi = [
	"子",
	"丑",
	"寅",
	"卯",
	"辰",
	"巳",
	"午",
	"未",
	"申",
	"酉",
	"戌",
	"亥",
];
const Wx = ["木", "火", "土", "金", "水"];
const Fw = ["东", "南", "中", "西", "北"];
const Shishen = [
	"比肩",
	"劫财",
	"偏印(枭神)",
	"正印",
	"偏官(七杀)",
	"正官",
	"偏财",
	"正财",
	"食神",
	"伤官",
];
//const Animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
//const solarTerm = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
const solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const sTermInfo = [
	0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072,
	240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210,
	440795, 462224, 483532, 504758,
];

//干支
export const getCyclical = (num: number) => {
	return Gan[num % 10] + Zhi[num % 12];
};

// 公历
export const getSolarDays = (y: number, m: number) => {
	if (m === 1) {
		return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28;
	} else {
		return solarMonth[m];
	}
};

//某年的第n个节气为几日(从0小寒起算)
export const getSTerm = (y: number, n: number) => {
	const offDate = new Date(
		31556925974.7 * (y - 1900) +
			sTermInfo[n] * 60000 +
			Date.UTC(1900, 0, 6, 2, 5),
	);
	return offDate.getUTCDate();
};

/**
 * 计算时柱 （论日上起时）
 * 甲己还加甲，
 * 乙庚丙作初，
 * 丙辛从戊起，
 * 丁壬庚子居，
 * 戊癸何方发，
 * 壬子是真途
 * @param m
 */

export const calcSz = (rz: string, hour: number) => {
	if (typeof rz !== "string") return "";
	const rg = rz.substring(0, 1);
	let st = 0;
	const x = Math.ceil(hour / 2) % 12; //计算出时辰是第几位
	if (rg === "甲" || rg === "己") {
		st = 1; //"甲";
	} else if (rg === "乙" || rg === "庚") {
		st = 3; //"丙";
	} else if (rg === "丙" || rg === "辛") {
		st = 5; //"戊";
	} else if (rg === "丁" || rg === "壬") {
		st = 7; //"庚";
	} else if (rg === "戊" || rg === "癸") {
		st = 9; //"壬";
	}
	return Gan[(x + st - 1) % 10] + Zhi[x];
};

export const calcHour = (hour: number) => {
	const x = Math.ceil(hour / 2) % 12;
	return Zhi[x];
};

export const calcWuXing = (gz: string) => {
	if (typeof gz !== "string") return "";
	const tg = gz?.substring(0, 1);
	const tgi = Gan.indexOf(tg);
	let fw = Fw[((tgi / 2) | 0) % 5];
	let wx = Wx[((tgi / 2) | 0) % 5];

	const dz = gz?.substring(1, 1);
	switch (dz) {
		case "申":
		case "酉":
			wx += "金";
			fw += "西";
			break;
		case "寅":
		case "卯":
			wx += "木";
			fw += "东";
			break;
		case "子":
		case "亥":
			wx += "水";
			fw += "北";
			break;
		case "巳":
		case "午":
			wx += "火";
			fw += "南";
			break;
		default:
			wx += "土";
			fw += "中";
	}
	return { wx, fw };
};

export const getCalc = (objDate: Date) => {
	const y = objDate.getFullYear();
	const m = objDate.getMonth();
	const d = objDate.getDate();
	const h = objDate.getHours();

	//年柱,月柱,日柱
	let cY;
	let cM;

	////////年柱 1900年立春后为庚子年(60进制36)
	if (m < 2) {
		cY = getCyclical(y - 1900 + 36 - 1);
	} else {
		cY = getCyclical(y - 1900 + 36);
	}
	const term2 = getSTerm(y, 2); //立春日期
	//依节气调整二月分的年柱, 以立春为界
	if (m === 1 && d >= term2) cY = getCyclical(y - 1900 + 36);

	// 月柱 1900年1月小寒以前为 丙子月(60进制12)
	const firstNode = getSTerm(y, m * 2); //返回当月「节」为几日开始
	cM = getCyclical((y - 1900) * 12 + m + 12);
	//依节气月柱, 以「节」为界
	if (d >= firstNode) cM = getCyclical((y - 1900) * 12 + m + 13);

	//当月一日与 1900/1/1 相差天数
	//1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
	const dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
	//日柱
	const cD = getCyclical(dayCyclical + d - 1);

	//八字
	const baZi = `${cY}、${cM}、${cD}、${calcSz(cD, h)}`;

	const nzWX = calcWuXing(cY);
	const yzWX = calcWuXing(cM);
	const rzWX = calcWuXing(cD);
	const szWX = calcWuXing(calcSz(cD, h));

	//五行
	const wuXing = `${nzWX.wx}、${yzWX.wx}、${rzWX.wx}、${szWX.wx}`;

	//方位
	const fangWei = `${nzWX.fw}、${yzWX.fw}、${rzWX.fw}、${szWX.fw}`;

	return { baZi, wuXing, fangWei };
};
