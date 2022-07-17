<template>
  <view class="tips">
    <text v-if="[1].includes(info.state)">
      {{ $t("gou-mai-nin-ke-yi-dian-ji-xia-fang") }}
    </text>

    <text v-if="info.state === 2 && info.nickname_type === 2">
      {{ $t("deng-xin-xi-fang-zhi-hui-kuan-bei") }}
    </text>

    <text v-if="info.state === 3 && info.nickname_type === 1">
      {{ $t("ding-dan-que-ren-chao-shi-wei-que-ren") }}
    </text>
  </view>
</template>

<script>
/**
 * 提示框
 * @property {Number} status
 * @property {Number} sell
 */
export default {
  name: "Tips",
  inject: ["info"],
  props: {
    status: {
      type: Number,
      default: 1,
    },
    sell: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.tips {
  background-color: rgba(242, 146, 9, 0.09);
  padding: 20rpx 30rpx;
  margin-top: 40rpx;
  border-radius: 8rpx;
  text {
    color: #f29209;
    font-size: 20rpx;
  }
}
</style>
