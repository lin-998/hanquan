import http from "utils/request.js";

// 轮播图
export const bannerList = () => http.post("/api/banner/banner_list");

// 公告列表
export const noticeList = (data) => http.post("/api/notice/getTitles", data);

// 公告列表
export const notices = (data) => http.post("/api/notice/getList", data);

// 公告详情
export const noticeDetails = (data) => http.post("/api/notice/details", data);

// 首页数据
export const homeInfo = () => http.post("/api/index/index");
