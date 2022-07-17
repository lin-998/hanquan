export default {
  install(Vue) {
    Vue.prototype.$toast = function (title, icon = "none") {
      uni.showToast({
        icon,
        title,
      });
    };

    Vue.prototype.$back = function (delta, duration = 1500) {
      setTimeout(() => {
        uni.navigateBack({
          delta,
        });
      }, duration);
    };
  },
};
