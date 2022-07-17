<template>
  <view class="p30">
    <view v-if="type === '1'">
      <view>
        <text class="color-f6">{{ $t("pi-di-zhi") }}</text>
      </view>
      <view class="input-wrap">
        <u-input
          v-model="info.pi_addr"
          height="80"
          :custom-style="{ color: '#f6f6f6' }"
          @blur="submit"
        ></u-input>
      </view>
    </view>
    <view v-else>
      <view>
        <text class="color-f6">{{ $t("dian-hua-hao-ma") }}</text>
      </view>
      <view class="input-wrap">
        <u-input
          v-model="info.mobile"
          height="80"
          :custom-style="{ color: '#f6f6f6' }"
          @blur="submit"
        ></u-input>
      </view>
    </view>
  </view>
</template>

<script>
import { modityInfo } from "@/api/profile.js";
export default {
  data() {
    return {
      info: {
        pi_addr: "",
        mobile: "",
      },
      type: "1",
    };
  },
  onLoad(options) {
    this.type = options.type;
    uni.setNavigationBarTitle({
      title: this.$t("xin-xi-xiu-gai"),
    });
    let { pi_addr, mobile } = this.$store.getters.userInfo;
    this.info = { pi_addr, mobile };
  },
  methods: {
    async submit() {
      let value = this.type === "1" ? this.info.pi_addr : this.info.mobile;
      if (!value) {
        this.$toast(this.$t("qing-shu-ru-nei-rong"));
        return;
      }
      await modityInfo(this.info);
      this.$toast(this.$t("xiu-gai-cheng-gong"));
      this.$back();
    },
  },
};
</script>

<style lang="scss" scoped>
.input-wrap {
  background-color: #45324a;
  margin-top: 20rpx;
  padding: 0 40rpx;
  border-radius: 8rpx;
}
</style>
