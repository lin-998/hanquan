<template>
  <view class="p30">
    <view class="box-wrap">
      <u-parse :html="config.about_us"></u-parse>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  computed: {
    config() {
      return this.$store.getters.config;
    },
  },
};
</script>

<style lang="scss" scoped>
.box-wrap {
  background-color: #45324a;
  border-radius: 8rpx;
  padding: 30rpx;
  min-height: 440rpx;
}
</style>
