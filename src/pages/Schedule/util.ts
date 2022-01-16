import { DATE_UNIT_TYPE, PRESET_REPEAT_MODE, Job } from "./type";
import dayjs, { Dayjs } from "dayjs";

/**
 * 颜色备选
 */
export const COLORS = [
  "#FF6666",
  "#006699",
  "#339933",
  "#CCCC00",
  "#FF9933",
  "#663399",
  "#CC3333",
  "#FFCCCC",
  "#99CC00",
];

/**
 * 校验日期包含
 */
export function isDayIncluded(date: Dayjs, job: Job, unitCheck: DATE_UNIT_TYPE) {
  const { times, gap, unit } = job.repeat;
  for (let idx = 0; idx < times + 1; idx++) {
    const current = dayjs.unix(job.start).add(idx * gap, unit);
    if (current.isSame(date, unitCheck)) {
      return {
        start: dayjs.unix(job.start).add(idx * gap, unit),
        end: dayjs.unix(job.end).add(idx * gap, unit),
      };
    }
    if (current.isAfter(date)) {
      return;
    }
  }
  return;
}

/**
 * 日期单位映射
 */
export function mapDateUnitType(type: DATE_UNIT_TYPE) {
  const maps = {
    [DATE_UNIT_TYPE.SECOND]: "秒",
    [DATE_UNIT_TYPE.MINUTE]: "分钟",
    [DATE_UNIT_TYPE.HOUR]: "小时",
    [DATE_UNIT_TYPE.DAY]: "天",
    [DATE_UNIT_TYPE.WEEK]: "周",
    [DATE_UNIT_TYPE.MONTH]: "月",
    [DATE_UNIT_TYPE.YEAR]: "年",
  };
  return maps[type];
}

/**
 * 频次单位映射
 */
export function mapFrequency(gap: number, unit: DATE_UNIT_TYPE) {
  if (gap < 1) {
    return "无重复";
  } else if (gap === 1) {
    return `每${mapDateUnitType(unit)}`;
  } else {
    return `每${gap}${mapDateUnitType(unit)}`;
  }
}
