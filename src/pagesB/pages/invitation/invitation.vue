<template>
  <view class="row--center__center contain">
    <view class="box-wrap" :style="{ background: 'url(' + info.image + ')' }">
      <view class="text-center">{{ $t("wo-de-yao-qing-ma") }}</view>
      <view class="mt40 row--center__center">
        <u-image width="256" height="256" :src="info.qrcode"></u-image>
      </view>
      <view class="text-center mt40">{{
        $t("yao-qing-ma-infousername", [info.code])
      }}</view>
      <AppButton
        widht="342rpx"
        height="80rpx"
        margin="40rpx 0 30rpx"
        @click="handleCopy"
      >
        {{ $t("dian-ji-fu-zhi-yao-qing-ma") }}
      </AppButton>
      <AppButton widht="342rpx" height="80rpx" @click="handleSave">
        {{ $t("dian-ji-bao-cun-yao-qing-er-wei-ma") }}
      </AppButton>
    </view>
  </view>
</template>

<script>
import { getShareInfo } from "@/api/profile.js";
export default {
  data() {
    return {
      info: {},
    };
  },
  onLoad() {
    this.getShareInfo();
  },

  methods: {
    async getShareInfo() {
      let { data } = await getShareInfo();
      this.info = data;
      // this.bgurl = info.image;
    },
    handleCopy() {
      // #ifndef H5
      uni.setClipboardData({
        data: this.info.username,
      });
      // #endif
    },
    handleSave() {
      uni.downloadFile({
        url: this.info.qrcode,
        success: (res) => {
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              this.$toast(this.$t("yi-bao-cun-zhi-xi-tong-xiang-ce"));
            },
          });
        },
      });
    },
  },
};
</script>

<style lang="scss">
.contain {
  height: 100%;
}
.box-wrap {
  width: 480rpx;
  padding: 40rpx 70rpx 70rpx;
  background-color: #45324a;
  margin-top: 120rpx;
  border-radius: 8rpx;
}
</style>
