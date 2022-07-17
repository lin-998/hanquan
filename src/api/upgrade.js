import http from "@/utils/request.js";

// 发送验证码
export const info = (data) => http.post("/api/app/info", data);
