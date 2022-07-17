<template>
  <view class="p30">
    <mescroll-body @init="mescrollInit" @down="downCallback" @up="getList">
      <view v-for="item in list" :key="item.id" class="list-item">
        <view class="row--center__spaceB">
          <view>
            <text class="color-999 fontsize-24">{{
              $t("ti-bi-lei-xing")
            }}</text>
            <text class="color-ccc ml20">{{ `${item.wallet_type}-USDT` }}</text>
          </view>
          <text class="fontsize-20 color-999">{{ item.createtime }}</text>
        </view>
        <view class="mt20 row--center__spaceB">
          <view>
            <view>
              <text class="color-999 fontsize-24">{{ $t("ti-bi-jin-e") }}</text>
              <text class="color-ccc ml20">{{ item.amount }} USDT</text>
            </view>
            <view class="mt20">
              <text class="color-999 fontsize-24">{{ $t("shou-xu-fei") }}</text>
              <text class="color-ccc ml20">{{ item.service_charge }} USDT</text>
            </view>
          </view>
          <view class="status" :class="[findStatus(item.status).class]">
            {{ findStatus(item.status).label }}
          </view>
        </view>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
import { getWithdrawalRecord } from "@/api/profile.js";

import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";

export default {
  mixins: [MescrollMixin],
  data() {
    return {
      list: [],
      form: {
        page: 1,
      },
      STATUS: {
        0: { label: this.$t("shen-qing-zhong"), class: "" },
        1: { label: this.$t("yi-tong-guo"), class: "success" },
        2: { label: this.$t("yi-ju-jue"), class: "fail" },
      },
    };
  },
  onLoad() {},
  methods: {
    async getList(page) {
      if (page.num == 1) this.list = [];
      this.form.page = page.num;
      let { data, totalpage } = await getWithdrawalRecord(this.form);
      this.list.push(...data);
      let len = data.length;
      this.mescroll.endByPage(len, totalpage);
    },
    findStatus(type) {
      return this.STATUS[type];
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  background-color: #45324a;
  padding: 32rpx 26rpx;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}
.status {
  width: 152rpx;
  height: 70rpx;
  background-color: #2e3f8d;
  border-radius: 8rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6b87ff;

  &.success {
    background-color: #1f5e1f;
    color: #18bc18;
  }
  &.fail {
    background-color: #751b1b;
    color: #e91e1e;
  }
}
</style>
