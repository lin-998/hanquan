<template>
  <view class="con">
    <rich-text
      :nodes="introduceText"
      :selectable="true"
      class="rich_text"
    ></rich-text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      introduceText: "",
    };
  },
  onLoad(opt) {
    this.introduceText = opt.text;
    // console.log(opt.text)
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.con {
  margin: 20rpx 30rpx 0 30rpx;
  padding: 40rpx 30rpx 0 30rpx;
  background: #45324a;
  height: 1150rpx;
  border-radius: 10rpx;
  .rich_text {
    color: #bfbfbf;
  }
}
</style>
