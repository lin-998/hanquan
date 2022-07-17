<script>
// #ifdef MP-WEIXIN
import updateManager from "@/utils/updateManager.js";
// #endif

// #ifdef APP-PLUS
import { info } from "@/api/upgrade.js";
import Upgrade from "@/utils/upgrade.js";
const sysInfo = uni.getSystemInfoSync();
// #endif

import { setLanguage } from "@/api/profile.js";

export default {
  onLaunch: function () {
    this.$store.dispatch("user/updateConfig");
    this.setLanguage();
  },
  onShow: function () {
    // 小程序更新
    // #ifdef MP-WEIXIN
    updateManager();
    // #endif
    // #ifdef APP-PLUS
    this.appInfo();
    // #endif
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {
    setLanguage() {
      let lang = uni.getLocale();
      setLanguage({ lg: lang === "zh-Hans" ? "zh-cn" : "en" });
    },
    async appInfo() {
      let { data } = await info();
      let status = await Upgrade.compareVersion(data.app_version);
      if (status === 0) return;
      let { cancel } = await uni.showModal({
        title: "应用更新",
        content: "应用有新版版, 是否需要更新",
        confirmText: "更新",
      });
      if (cancel) return;
      this.installApp(data, status);
    },
    installApp(data, status) {
      if (status === 2) {
        Upgrade.install(data.app_update_package);
      } else if (status === 1) {
        sysInfo.platform === "ios"
          ? plus.runtime.openURL(data.ios_package)
          : Upgrade.install(data.app_package);
      }
    },
  },
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";

/*每个页面公共css */
page {
  font-size: 28rpx;
  color: #f6f6f6;
  background: #2c0d33;
}
@import "common/css/common.scss";
@import "common/css/base.scss";
@import "common/css/custom.scss";
</style>
