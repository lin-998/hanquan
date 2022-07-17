import http from "utils/request.js";

// 交易大厅
export const tradeHall = (data) => http.post("api/otc/otc/tradeHall", data);

// 发布买单
export const createBuyOrder = (data) =>
  http.post("api/otc/otc/createBuyOrder", data);

// 发布买单计算购买总数量/金额
export const calculationBuyPrice = (data) =>
  http.post("api/otc/otc/calculationBuyPrice", data);

// 计算出售的总数量/金额和手续费/金额
export const calculationSellPrice = (data) =>
  http.post("api/otc/otc/calculationSellPrice", data);

// 发布卖单
export const createSellOrder = (data) =>
  http.post("api/otc/otc/createSellOrder", data);

// 获取买单/卖单下单页面详情
export const getPayOrderDetail = (data) =>
  http.post("api/otc/otc/getPayOrderDetail", data);

// 买入卖单
export const orderSellOrder = (data) =>
  http.post("api/otc/otc/orderSellOrder", data);

// 卖出买单
export const orderBuyOrder = (data) =>
  http.post("api/otc/otc/orderBuyOrder", data);

// 查询个人信息
export const getOrderUserInfo = (data) =>
  http.post("api/otc/otc/getOrderUserInfo", data);

// 查询是否有需要提示的订单
export const userOrderNotice = (data) =>
  http.post("api/otc/otc/userOrderNotice", data);

//查询是否有未付款的警告提示
export const userPayWarning = (data) =>
  http.post("api/otc/otc/userPayWarning", data);
