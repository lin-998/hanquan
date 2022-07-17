import http from "utils/request.js";

// 查询法币对应的收款方式
export const getCoinPayList = () => http.post("api/otc/coin/getCoinPayList");

// 查询用户收款方式
export const getUserCoinPay = () => http.post("api/otc/coin/getUserCoinPay");

// 用户添加收款方式
export const userSetCoinPay = (data) =>
  http.post("api/otc/coin/userSetCoinPay", data);

// 用户收款方式删除
export const userDeleteCoinPay = (data) =>
  http.post("api/otc/coin/userDeleteCoinPay", data);

// 查询用户收款方式详情
export const getUserPay = (data) => http.post("api/otc/coin/getUserPay", data);

// 用户收款方式修改
export const userUpdateCoinPay = (data) =>
  http.post("api/otc/coin/userUpdateCoinPay", data);
