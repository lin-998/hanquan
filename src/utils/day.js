import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTimeFormat from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTimeFormat);
dayjs.locale("zh-cn"); // 全局使用简体中文

/**
 * @Function formatDate
 * @param {string} date - 日期
 * @param {string} format - 格式化占位符
 * @returns {string} - 根据传入的占位符返回格式化后的日期
 */
export function formatDate(date, format = "llll") {
  return dayjs(date).format(format);
}

export function changetime(seconds) {
  let hour =
    Math.floor(seconds / 3600) >= 10
      ? Math.floor(seconds / 3600)
      : "0" + Math.floor(seconds / 3600);
  seconds -= 3600 * hour;
  let min =
    Math.floor(seconds / 60) >= 10
      ? Math.floor(seconds / 60)
      : "0" + Math.floor(seconds / 60);
  seconds -= 60 * min;
  let sec = seconds >= 10 ? seconds : "0" + seconds;
  return hour + ":" + min + ":" + sec;
}

/**
 * @Function diffDate
 * @param {string} d1 - 日期1
 * @param {string} d2 - 日期2
 * @param {string} unit - 单位 默认毫秒
 * @returns {string} - 返回指定单位下两个日期时间之间的差异
 */
export function diffDate(d1, d2) {
  const date1 = dayjs(d1);
  const date2 = dayjs(d2);
  return date1.diff(date2);
}

/**
 * @Function relativeTime
 * @param {string} date - 日期
 * @returns {string} - 返回指定时间以前
 */
export function relativeTime(date) {
  return dayjs(date).fromNow();
}

/**
 * @Function time
 * @param {string} date - 日期
 * @returns {string} - 返回时间戳（秒数）
 */
export function unixTime(date) {
  return dayjs(date).unix();
}
