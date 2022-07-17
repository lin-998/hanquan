import http from "@/utils/request";

// 订单记录
export const orderList = (data) => http.post("api/otc/otc/tradeMy", data);

// 订单详情
export const detailOrder = (data) => http.post("api/otc/otc/detailOrder", data);

// 撤单
export const revokeOrder = (data) => http.post("api/otc/otc/revokeOrder", data);

// 查询买家付款时能选择的支付类型和信息
export const getSellerPayInfo = (data) =>
  http.post("api/otc/otc/getSellerPayInfo", data);

// 买家付款
export const payOrder = (data) => http.post("api/otc/otc/payOrder", data);

// 申述
export const complaint = (data) => http.post("api/otc/otc/complaint", data);

// 卖家确认
export const dealOrder = (data) => http.post("api/otc/otc/dealOrder", data);

// 订单评价
export const appraiseOrder = (data) =>
  http.post("api/otc/otc/appraiseOrder", data);
