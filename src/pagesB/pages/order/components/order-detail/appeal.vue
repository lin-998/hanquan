<template>
  <view class="appeal">
    <view>
      <text class="fontsize-26 color-999">{{ $t("shen-su-shi-jian") }}</text>
      <text class="ml20 fontsize-24">{{ info.appeal_time }}</text>
    </view>
    <view class="mt20">
      <text class="fontsize-26 color-999">{{ $t("shen-su-zhuang-tai") }}</text>
      <text class="ml20 color-red fontsize-24">{{ $t("shen-he-zhong") }}</text>
    </view>
    <view class="mt20">
      <view class="fontsize-26 color-999">{{ $t("shen-su-li-you-0") }}</view>
      <view class="color-ccc fontsize-24">
        {{ info.appeal_content }}
      </view>
    </view>
    <view class="mt20 fontsize-26 color-999">
      <view class="mb20">{{ $t("bu-chong-cai-liao") }}</view>
      <view class="flex u-flex-wrap">
        <u-image
          v-for="(item, index) in info.appeal_img"
          :key="item"
          width="200"
          height="200"
          :src="item"
          @click="imageClick(index)"
        ></u-image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "Appeal",
  inject: ["info"],
  data() {
    return {
      form: {
        orderid: "",
        contents: "",
        images: "",
      },
    };
  },
  methods: {
    imageClick(index) {
      uni.previewImage({
        urls: this.info.appeal_img,
        current: index,
      });
    },
  },
};
</script>

<style scoped>
.appeal {
  padding: 30rpx 40rpx 40rpx;
  background-color: #45324a;
  border-radius: 8rpx;
  margin-top: 20rpx;
}
.tips {
  background-color: rgba(242, 146, 9, 0.09);
  padding: 20rpx 30rpx;
  margin-top: 40rpx;
  border-radius: 8rpx;
  color: #f29209;
  font-size: 20rpx;
}
</style>
