const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo || uni.getStorageSync("userInfo"),
  config: (state) => state.user.config || uni.getStorageSync("config"),
  getCoin: (state) => state.user.coin,
  coinIcon: (state) => state.user.coinIcon,
};
export default getters;
