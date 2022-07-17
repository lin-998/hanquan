import Request from "./luch-request/index.js";
import { Secret } from "./secret.js";
import { getTimeStamp } from "./secret.js";
// import Qs from "qs";

import { VUE_APP_API } from "@/config/index.js";
import { debounce } from "@/utils/tool.js";

const getTokenStorage = () => uni.getStorageSync("token");
// const isFormData = (obj) =>
//   Object.prototype.toString.call(obj) === "[object FormData]";

// 如果是h5并且是开发环境不能设置baseurl 不然proxy代理无效
const baseURL =
  process.env.NODE_ENV === "development" &&
  process.env.VUE_APP_PLATFORM === "h5"
    ? ""
    : VUE_APP_API;

const http = new Request({
  baseURL,
  // header: {
  //   "Content-Type": "application/x-www-form-urlencoded",
  // },
});

http.interceptors.request.use(
  async (config) => {
    config.header["token"] = getTokenStorage();
    // if (config.data && !isFormData(config.data)) {
    //   config.data = Qs.stringify(config.data);
    // }
    if (config.data && config.method === "POST") {
      let urls = ["/api/user/upload", "/api/upload/upFile"];
      //图片上传接口不需要加密
      if (!urls.includes(config.url)) {
        //同步请求 获取时间戳
        await getTimeStamp().then((res) => {
          config.data.vtime = res;
          config.data = {
            data: Secret.encrypt(JSON.stringify(config.data)),
          };
        });
      }
    }
    return config;
  },
  (config) => {
    return Promise.reject(config);
  }
);

http.interceptors.response.use(
  (response) => {
    if (response.data.data) {
      response.data.data = JSON.parse(Secret.decrypt(response.data.data));
      if (response.data.data.page) {
        response.data = response.data.data;
      }
    }
    if (response.data.code === 0) {
      toast(response.data.msg);
      return Promise.reject(response.data);
    } else if ([6666, 401].includes(+response.data.code)) {
      toast(response.data.msg);
      toLogin();
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (response) => {
    if (response.data.code === 401) {
      toast(response.data.msg);
      toLogin();
      return Promise.reject(response.data);
    }

    toast("请求连接超时，请检查网络连接");
    return Promise.reject(response);
  }
);

function toast(msg) {
  uni.showToast({
    title: msg,
    icon: "none",
  });
}

const toLogin = debounce(
  function () {
    uni.navigateTo({
      url: "/pages/login/login",
    });
  },
  1500,
  false
);

export default http;
