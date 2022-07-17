import http from "@/utils/request";

// 账号登录
export const userLogin = (data) => http.post("/api/user/login", data);

// 点击注册页面的提交按钮
export const register = (data) => http.post("/api/user/register", data);

// 我的页面点击退出按钮
export const logout = (data) => http.post("/api/user/logout", data);
