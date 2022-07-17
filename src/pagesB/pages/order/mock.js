/**
 * @description 订单列表mock, 存放模拟数据和常量, 请谨慎删除
 * @property {Array} list -模拟数据
 * @property {Object} STATUS_MAP 状态
 * @property {Array} FILTER_MAP 筛选列表
 * @alias mock
 */
import i18 from "@/locale/i18.js";
export default {
  STATUS_MAP: {
    1: {
      label: i18.t("dai-jie-dan"),
      desc: new Map([
        [1, i18.t("qing-deng-dai-yong-hu-jie-dan-shou-chu")],
        [2, i18.t("qing-deng-dai-yong-hu-jie-dan-gou-mai")],
      ]),
      icon: "daijiedan_icon",
    },
    2: {
      label: i18.t("wei-fu-kuan"),
      desc: new Map([
        [1, i18.t("ding-dan-yi-chuang-jian-qing-deng-dai-mai-fang-zhi-fu")],
        [2, i18.t("ding-dan-yi-chuang-jian-qing-jin-kuai-zhi-fu")],
      ]),
      icon: "daiqueren_icon",
    },
    3: {
      label: i18.t("yi-fu-kuan-dai-que-ren"),
      desc: new Map([
        [1, i18.t("mai-jia-yi-fu-kuan-qing-jin-kuai-que-ren")],
        [2, i18.t("yi-fu-kuan-deng-dai-mai-fang-que-ren")],
      ]),
      icon: "daiqueren_icon",
    },
    4: {
      label: i18.t("yi-wan-cheng"),
      desc: new Map([
        [1, i18.t("nin-yi-cheng-gong-chu-shou")],
        [2, i18.t("nin-yi-cheng-gong-gou-mai")],
      ]),
      icon: "yicg_icon",
    },
    10: {
      label: i18.t("shen-su-zhong"),
      desc: i18.t("ding-dan-shen-su-zhong-qing-deng-dai-ke-fu-chu-li"),
      icon: "shenshuzhong_icon",
    },
    20: {
      label: i18.t("yi-guo-qi"),
      desc: i18.t("ding-dan-yi-guo-qi-wu-fa-jiao-yi"),
      icon: "yiguoqi_icon",
    },
    30: {
      label: i18.t("yi-qu-xiao"),
      desc: i18.t("ding-dan-yi-qu-xiao-wu-fa-jiao-yi"),
      icon: "yiquxiao_icon",
    },
  },
  FILTER_MAP: [
    {
      label: i18.t("jiao-yi-bi-zhong"),
      prop: "coin_type",
      list: [
        { label: "USDT", value: 1 },
        { label: "PI", value: 2 },
        { label: "MYPI", value: 3 },
      ],
    },
    {
      label: i18.t("jiao-yi-lei-xing"),
      prop: "type",
      list: [
        { label: i18.t("gou-mai"), value: 1 },
        { label: i18.t("chu-shou"), value: 2 },
      ],
    },
    {
      label: i18.t("ding-dan-zhuang-tai"),
      prop: "state",
      list: [
        { label: i18.t("dai-jie-dan"), value: 1 },
        { label: i18.t("wei-fu-kuan"), value: 2 },
        { label: i18.t("yi-fu-kuan"), value: 3 },
        { label: i18.t("yi-wan-cheng"), value: 4 },
        { label: i18.t("shen-su-zhong"), value: 10 },
        { label: i18.t("yi-guo-qi"), value: 20 },
        { label: i18.t("yi-qu-xiao"), value: 30 },
      ],
    },
  ],
};
