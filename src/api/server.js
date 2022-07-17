import http from "@/utils/request.js";

// 获取我的问题反馈列表
export const feedbackList = (data) =>
  http.post("/api/question/feedbackList", data);

// 获取我的问题反馈详情
export const feedbackDetail = (data) =>
  http.post("/api/question/feedbackDetail", data);

// 提交我的问题反馈信息
export const addFeedback = (data) =>
  http.post("/api/question/addFeedback", data);

// 获取联系客服信息
export const getServiceInfo = (data) =>
  http.post("/api/question/getServiceInfo", data);

// 获取帮助列表
export const getList = (data) => http.post("/api/helpcenter/getList", data);

// 帮助详情
export const detail = (data) => http.post("/api/helpcenter/detail", data);

// 问题回复
export const addFeedbackDetail = (data) =>
  http.post("/api/question/addFeedbackDetail", data);

// 关闭问题反馈
export const feedbackClose = (data) =>
  http.post("/api/question/feedbackClose", data);
