<template>
  <view class="p30" style="height: 100%">
    <view class="box-wrap">
      <view class="fontsize-30 text-center">{{ detail.title }}</view>
      <view class="fontsize-22 mt20 text-center color-999">
        {{ $t("fa-bu-shi-jian-detailcreatetime", [detail.create_time]) }}
      </view>
      <view class="mt30 color-999 overHidden--scroll__x">
        <u-parse :html="detail.content"></u-parse>
      </view>
    </view>
  </view>
</template>

<script>
import { detail } from "@/api/server.js";
export default {
  data() {
    return {
      detail: {},
    };
  },
  onLoad(op) {
    this.op = op;
    this.fetchDetail();
  },
  methods: {
    fetchDetail() {
      detail({ id: this.op.id }).then((res) => {
        this.detail = res.data;
      });
    },
  },
};
</script>

<style>
page {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.box-wrap {
  height: 100%;
  background-color: #45324a;
  border-radius: 8rpx;
  padding: 30rpx;
}
</style>
