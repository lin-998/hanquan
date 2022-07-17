import CryptoJS from "crypto-js";
import http from "./request.js";
// import baseUrl from "@/api/app.js"
let baseUrl = "http://www.mypi.network";
export const Secret = new (class {
  constructor() {
    this.key = "ljda_dj@.dv?sjdf";
  }
  /**
   * aes加密 cryptJS
   * @param {加密的数据} data
   */
  encrypt(data) {
    return CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(this.key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  }
  /**
   * aes解密 cryptJS
   * @param {解密的数据} data
   */
  decrypt(data) {
    return CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(this.key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
  }
})();
// 获取服务器时间
export const getTimeStamp = () => {
  return new Promise((resolve) => {
    uni.request({
      url: baseUrl + "/api/app/getTime",
      method: "POST",
      success: (res) => {
        resolve(res.data.time);
      },
    });
  });
};
