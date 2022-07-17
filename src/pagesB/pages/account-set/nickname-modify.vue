<template>
  <view class="p30">
    <view>
      <text class="color-f6">{{ $t("xing-ming") }}</text>
      <text class="color-999 fontsize-22 ml20">
        {{ $t("420-ge-zi-fu-ke-you-zhong-ying-wen-shu-zi-zu-cheng") }}
      </text>
    </view>
    <view class="input-wrap">
      <u-input
        v-model="nickname"
        height="80"
        :custom-style="{ color: '#f6f6f6' }"
        @blur="submit"
      ></u-input>
    </view>
  </view>
</template>

<script>
import { changenick } from "@/api/profile.js";
export default {
  data() {
    return {
      nickname: "",
    };
  },
  onLoad() {
    this.nickname = this.$store.getters.userInfo.nickname;
  },
  methods: {
    submit() {
      if (!this.nickname) return this.$toast(this.$t("qing-shu-ru-ni-cheng"));
      if (this.nickname.length < 4)
        return this.$toast(this.$t("ni-cheng-zui-shao-bi-xu-4-ge-zi-fu"));
      if (this.nickname.length > 20)
        return this.$toast(this.$t("ni-cheng-zui-duo-bu-chao-guo-20-ge-zi-fu"));

      changenick({ nickname: this.nickname }).then((res) => {
        this.$toast(this.$t("xiu-gai-cheng-gong"));
        this.$back();
      });
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
