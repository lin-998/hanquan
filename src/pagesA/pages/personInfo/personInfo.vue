<template>
  <view class="p30">
    <view class="header">
      <view class="row--center__left mb36">
        <u-avatar size="88" :src="info.avatar"></u-avatar>
        <view class="ml30">
          <view class="mb10">{{ info.nickname }}</view>
          <view class="row--center__left">
            <text class="fontsize-22 mr10 color-b0a1ec">
              {{ $t("shen-fen-ren-zheng") }}
            </text>
            <u-image
              v-if="info.isreal === 1"
              width="30"
              height="30"
              src="/pagesA/static/renzheng.png"
            ></u-image>
          </view>
        </view>
      </view>
      <view class="row--center__left">
        <view class="flex--1 col--center__center">
          <view class="color-bf fontsize-24 mb20">{{
            $t("ping-jun-fang-hang")
          }}</view>
          <view>
            <text class="fontsize-32 mr14">{{ info.avg_confirm_time }}</text>
            <text class="fontsize-22 color-b0a1ec">{{
              $t("fen-zhong-0")
            }}</text>
          </view>
        </view>
        <view class="header-line"></view>
        <view class="flex--1 col--center__center">
          <view class="color-bf fontsize-24 mb20">{{
            $t("ping-jun-fu-kuan")
          }}</view>
          <view>
            <text class="fontsize-32 mr14">{{ info.avg_payment_time }}</text>
            <text class="fontsize-22 color-b0a1ec">{{
              $t("fen-zhong-0")
            }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="info">
      <view class="row--center__spaceB pb20 pt20 u-border-bottom">
        <view>{{ $t("xin-xi") }}</view>
        <view class="row--center__left" @tap="moreInfo">
          <text class="mr12 fontsize-20" style="color: #777">{{
            $t("geng-duo-shu-ju")
          }}</text>
          <u-icon name="arrow-right" size="10" color="#777777"></u-icon>
        </view>
      </view>
      <view class="pt30 row--center__left">
        <view class="flex--1 col--center__center">
          <view>
            <text class="fontsize-32">{{ info.order_quantity }}</text>
          </view>
          <view class="color-bf fontsize-24 mt20">{{
            $t("30-ri-cheng-dan-shu")
          }}</view>
        </view>
        <view class="flex--1 col--center__center">
          <view>
            <text class="fontsize-32">{{ info.order_completion_rate }}</text>
          </view>
          <view class="color-bf fontsize-24 mt20">{{
            $t("30-ri-cheng-dan-shuai")
          }}</view>
        </view>
        <view class="flex--1 col--center__center">
          <view>
            <text class="fontsize-32">{{ info.good_rate }}</text>
          </view>
          <view class="color-bf fontsize-24 mt20">{{
            $t("hao-ping-shuai")
          }}</view>
        </view>
        <view class="flex--1 col--center__center">
          <view>
            <text class="fontsize-32">{{ info.bad_rate }}</text>
          </view>
          <view class="color-bf fontsize-24 mt20">{{
            $t("cha-ping-shuai")
          }}</view>
        </view>
      </view>
    </view>
    <view class="pb20 u-border-bottom mb20">
      {{ $t("zai-xian-guang-gao") }}
    </view>
    <view>
      <view class="color-b0a1ec fontsize-26 mb30">{{
        $t("zai-xian-chu-shou-guang-gao")
      }}</view>
      <trade-list :list="sell_data" @btnClick="handleTrade"></trade-list>
    </view>
    <view class="mt30">
      <view class="color-b0a1ec fontsize-26 mb30">{{
        $t("zai-xian-gou-mai-guang-gao")
      }}</view>
      <trade-list :list="buy_data" @btnClick="handleTrade"></trade-list>
    </view>
  </view>
</template>

<script>
import { getOrderUserInfo, getUserOrderList } from "@/api/transaction.js";
import TradeList from "@/pagesA/components/TradeList.vue";

export default {
  components: {
    TradeList,
  },
  data() {
    return {
      buy_data: [],
      sell_data: [],
      info: {},
    };
  },
  onLoad(options) {
    this.username = options.username || "HQ79747";
    this.getOrderUserInfo();
    this.getUserOrderList();
  },
  methods: {
    async getOrderUserInfo() {
      let { data } = await getOrderUserInfo({ username: this.username });
      this.info = data;
    },
    async getUserOrderList() {
      let { data } = await getUserOrderList({ username: this.username });
      this.sell_data = data.sell_data;
      this.buy_data = data.buy_data;
    },
    handleTrade(item) {
      uni.switchTab({
        url: "/pages/tabbar/P2P/P2P",
      });
      uni.$emit("selectChange", {
        orderid: item.id,
        selectValue: 2,
        isBuy: item.type === 2,
      });
    },
    moreInfo() {
      uni.navigateTo({
        url: "/pagesA/pages/moreInfo/moreInfo?username=" + this.username,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 284rpx;
  background: url(../../static/beijing@2x.png);
  background-size: cover;
  box-sizing: border-box;
  padding: 30rpx;
  margin-bottom: 40rpx;
  &-line {
    width: 2rpx;
    height: 56rpx;
    background: #ffffff;
    opacity: 0.1;
  }
}
.info {
  width: 100%;
  height: 243rpx;
  background: #341e3a;
  border-radius: 10rpx;
  box-sizing: border-box;
  padding: 0 35rpx;
  margin-bottom: 40rpx;
}
</style>
