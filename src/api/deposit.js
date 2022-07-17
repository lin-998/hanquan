import http from "@/utils/request";
//存款页面信息
export const depositInfo = (data) =>
  http.post("/api/otc/Invest/indexInfo", data);
//我要投资信息
export const userInvestInfo = (data) =>
  http.post("/api/otc/Invest/userInvestInfo", data);
//我要投资
export const userInvest = (data) =>
  http.post("/api/otc/Invest/userInvest", data);
//利息明细列表
export const interestList = (data) =>
  http.post("/api/otc/Invest/interestList", data);
//投资明细列表
export const userInvestList = (data) =>
  http.post("/api/otc/Invest/userInvestList", data);
//退仓明细列表
export const returnInvestList = (data) =>
  http.post("/api/otc/Invest/returnInvestList", data);
