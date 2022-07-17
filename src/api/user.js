import http from "@/utils/request";

// 搜索法币类型
export const getUserInfo = (data) =>
  http.post("/api/otc/coin/searchCoin", data);

// 获取全部法币类型
export const getCoinType = (data) =>
  http.post("/api/otc/coin/getCoinType", data);

// 获取当前法币类型
export const getCoin = (data) => http.post("/api/otc/coin/getCoin", data);

// 设置法币类型
export const setCoin = (data) => http.post("/api/otc/coin/setCoin", data);

// 查询法币对应的收款方式
export const getCoinPayList = (data) =>
  http.post("/api/otc/coin/getCoinPayList", data);

// 查询用户收款方式
export const getUserCoinPay = (data) =>
  http.post("/api/otc/coin/getUserCoinPay", data);

// 用户添加收款方式
export const userSetCoinPay = (data) =>
  http.post("/api/otc/coin/userSetCoinPay", data);
