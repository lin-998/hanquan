import { userLogin, logout } from "@/api/login.js";
import { getUserInfo } from "api/profile.js";
import { get_config } from "@/api/common.js";
import { setCoin } from "@/api/currency.js";

const state = {
  token: "",
  userInfo: null,
  config: null,
  coin: "CNY",
  coinIcon: "",
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
    uni.setStorageSync("token", token);
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
    uni.setStorageSync("userInfo", userInfo);
  },
  SET_COIN: (state, coin) => {
    state.coin = coin;
  },
  SET_ICON: (state, data) => {
    state.coinIcon = data;
  },
};

const actions = {
  async loginSubmit({ commit }, loginForm) {
    let { data } = await userLogin(loginForm);
    commit("SET_USERINFO", data);
    commit("SET_TOKEN", data.token);
    return data;
  },
  async updataUserInfo({ commit }) {
    let { data } = await getUserInfo();
    commit("SET_USERINFO", data);
  },
  async logout({ commit }) {
    try {
      await logout({ token: uni.getStorageSync("token") });
    } finally {
      commit("SET_USERINFO", null);
      uni.clearStorage();
      uni.reLaunch({
        url: "/pages/login/login",
      });
    }
  },
  async updateConfig({ state }) {
    let res = await get_config();
    state.config = res.data.data;
    uni.setStorageSync("config", state.config);
  },
  async submitCoin({ commit }, data) {
    let { name, symbol } = data;
    await setCoin({ name });
    commit("SET_COIN", name);

    uni.setStorageSync("coinIcon", symbol);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
