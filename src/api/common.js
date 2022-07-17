import http from "@/utils/request";

// 上传图片
export const uploadFile = (data) => http.post("/api/user/upload", data);

// 上传文件
export const upFileCurrency = (data) =>
  http.post("api/upload/upFileCurrency", data);

// 获取配置信息
export const get_config = (data) => http.post("/api/index/get_config", data);

// 发送验证码
export const juhesend = (data) => http.post("/api/sms/juhesend", data);

// 发送验证码
export const send = (data) => http.post("/api/ems/send", data);
