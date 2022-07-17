import http from "@/utils/request";

// 获取个人信息
export const getUserInfo = (data) => http.post("/api/user/getinfo", data);

// 获取当前语言类型
export const getLanguage = (data) =>
  http.post("/api/language/getLanguage", data);

// 设置语言类型
export const setLanguage = (data) =>
  http.post("/api/language/setLanguage", data);

// 实名认证
export const applyRealname = (data) => http.post("/api/user/addRealname", data);

// 实名认证状态信息
export const realnameInfo = (data) => http.post("/api/user/realnameInfo", data);

// 修改上传实名认证
export const modifyRealname = (data) =>
  http.post("/api/user/modifyRealname", data);

// 转账
export const transfer = (data) => http.post("/api/userreceipt/transfer", data);

// 互转记录
export const receipt_log = (data) =>
  http.post("/api/userreceipt/receipt_log", data);

// 我的页面点击头像
export const getinfo = (data) => http.post("/api/user/getinfo", data);

// 点击修改昵称页面的提交按钮
export const changenick = (data) => http.post("/api/user/changenick", data);

// 修改头像
export const changeavatar = (data) => http.post("/api/user/changeavatar", data);

// 修改登录密码
export const uppass = (data) => http.post("/api/user/uppass", data);

// 修改支付密码
export const uppaypsw = (data) => http.post("/api/user/uppaypsw", data);

// 忘记密码-重置密码
export const resetpwd = (data) => http.post("/api/user/resetpwd", data);

// 账户明细
export const Ccdetails = (data) => http.post("/api/log/Ccdetails", data);

// 我的团队
export const my_team = (data) => http.post("/api/user/my_team", data);

// 直推成员
export const zt_users = (data) => http.post("/api/user/zt_users", data);

// 用户成功授权拿到微信openid后，需绑定账户信息
export const wxbindmobile = (data) => http.post("/api/user/wxbindmobile", data);

// 通过微信授权的openid自动登录获取用户信息，如登录失败：须通过微信授权且已绑定过账户信息（微信绑定账户信息接口）
export const wxopenidlogin = (data) =>
  http.post("/api/user/wxopenidlogin", data);

// 该授权直接使用页面跳转方式，不是请求接口方式
// 在微信浏览器打开网站是自动发起授权，自动登录；授权成功会返回指定的页面链接并返回openid参数
export const getcode = (data) => http.post("/api/index/getcode", data);

// 充值明细
export const getRechargeRecord = (data) =>
  http.post("/api/wallet/wallet/getRechargeRecord", data);

// 提币参数信息
export const withdrawalConfig = () =>
  http.post("/api/wallet/wallet/withdrawalConfig");

// 提币
export const withdrawal = (data) =>
  http.post("/api/wallet/wallet/withdrawal", data);

// 提币明细
export const getWithdrawalRecord = (data) =>
  http.post("/api/wallet/wallet/getWithdrawalRecord", data);

// 转账
export const getAccepter = (data) =>
  http.post("/api/userreceipt/getAccepter", data);

// 修改手机号或PI地址
export const modityInfo = (data) => http.post("/api/user/modityInfo", data);

// 获取直推数据
export const getDirectInfo = (data) => http.post("/api/user/ztUsers", data);

// 获取我的联系方式
export const getUserContact = (data) =>
  http.post("/api/user/getUserContact", data);

// 设置我的联系方式
export const setUserContact = (data) =>
  http.post("/api/user/setUserContact", data);

// 互转接受者二维码
export const payee_qrcode = (data) =>
  http.post("/api/userreceipt/payee_qrcode", data);

// 点击充值初始化钱包
export const createWallet = (data) => http.post("/api/user/createWallet", data);

// 邀请好友配置信息
export const getShareInfo = (data) => http.post("/api/user/getShareInfo", data);
