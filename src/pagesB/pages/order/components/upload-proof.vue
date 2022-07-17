<template>
  <view class="upload-proof">
    <view class="upload">
      <u-icon name="plus-circle" size="86"></u-icon>
      <text>{{ $t("zheng-que-de-da-kuan-jie-tu") }}</text>
    </view>
  </view>
</template>

<script>
/**
 * 交易相关
 * @property {Number} status
 */
export default {
  name: "Transition",
  props: {
    status: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style scoped>
.upload-proof {
  background-color: #45324a;
  padding: 20rpx 40rpx;
  margin-top: 20rpx;
  border-radius: 8rpx;
}
.upload {
  width: 318rpx;
  height: 194rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2c0d33;
  border-radius: 8rpx;
  padding: 0 38rpx;
  font-size: 20rpx;
  color: #666666;
  margin: 0 auto;
}
</style>
