import http from "utils/request.js";

// 获取全部法币类型
export const getCoinType = () => http.post("api/otc/coin/getCoinType");

// 获取当前法币类型
export const getCoin = () => http.post("api/otc/coin/getCoin");

// 搜索法币类型
export const searchCoin = (data) => http.post("api/otc/coin/searchCoin", data);

// 设置法币类型
export const setCoin = (data) => http.post("api/otc/coin/setCoin", data);
