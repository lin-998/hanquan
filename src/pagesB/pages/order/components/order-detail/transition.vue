<template>
  <view class="transition">
    <view class="row--center__spaceB color-ccc" @tap="toDetailDeep">
      <text>{{ $t("jiao-yi-fang-shi") }}</text>
      <view class="row--center__right">
        <!-- <u-line direction="col" length="20" color="#8D3D9D" :hair-line="false" margin="8rpx 0 0"></u-line> -->
        <!-- <text class="ml10" style="color: #f29209;">{{ info.transaction && info.transaction.pay_text }}</text>  -->
        <u-icon name="arrow-right" size="30"></u-icon>
      </view>
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
  inject: ["info"],
  props: {
    status: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    toDetailDeep() {
      if (this.info.transaction && this.info.transaction.pay_text) {
        this.$u.route({
          url: "/pagesB/pages/order/order-detail-deep",
          params: { id: this.info.id },
        });
      }
    },
  },
};
</script>

<style scoped>
.transition {
  background-color: #45324a;
  padding: 20rpx 40rpx;
  margin-top: 20rpx;
  border-radius: 8rpx;
}
</style>
