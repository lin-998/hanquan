<template>
  <view class="content">
    <view class="fontsize-32 text-center mb30">{{ detail.title }}</view>
    <view class="color-999 fontsize-24">
      <u-parse :html="detail.contents"></u-parse>
    </view>
  </view>
</template>

<script>
import { noticeDetails } from "api/home.js";

export default {
  data() {
    return {
      detail: "",
      id: "",
    };
  },
  onLoad(op) {
    this.id = op.id;
    this._noticeDetails();
  },
  methods: {
    async _noticeDetails() {
      let res = await noticeDetails({ id: this.id });
      let detail = res.data;
      this.detail = detail;
    },
  },
};
</script>

<style scoped>
.content {
  padding: 60rpx 75rpx 0;
}
</style>
