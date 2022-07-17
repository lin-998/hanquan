<template>
  <view class="p30">
    <view class="u-border-bottom pb35">
      <view class="row--center__spaceB mb40">
        <view>{{ $t("30-ri-cheng-dan-shu") }}</view>
        <view class="row--center__left">
          <text class="fontsize-40 mr30 color-bf">{{
            info.order_quantity
          }}</text>
          <text class="fontsize-22 color-999">{{ $t("ci-shu") }}</text>
        </view>
      </view>
      <view class="row--center__spaceB">
        <view>{{ $t("30-ri-cheng-dan-shuai") }}</view>
        <view class="row--center__left">
          <text class="fontsize-40 mr30 color-bf">{{
            info.order_completion_rate
          }}</text>
        </view>
      </view>
    </view>

    <view class="u-border-bottom pb35 pt35">
      <view class="row--center__spaceB mb40">
        <view>{{ $t("ping-jun-fang-hang") }}</view>
        <view class="row--center__left">
          <text class="fontsize-40 mr30 color-bf">{{
            info.avg_confirm_time
          }}</text>
          <text class="fontsize-22 color-999">{{ $t("fen-zhong") }}</text>
        </view>
      </view>
      <view class="row--center__spaceB">
        <view>{{ $t("ping-jun-fang-kuan") }}</view>
        <view class="row--center__left">
          <text class="fontsize-40 mr30 color-bf">{{
            info.avg_payment_time
          }}</text>
          <text class="fontsize-22 color-999">{{ $t("fen-zhong-0") }}</text>
        </view>
      </view>
    </view>

    <view class="u-border-bottom pb35 pt35">
      <view class="row--center__spaceB mb40">
        <view>{{ $t("hao-ping-shuai") }}</view>
        <view class="row--center__left">
          <text class="fontsize-40 mr30 color-bf">{{ info.good_rate }}%</text>
        </view>
      </view>
      <view class="row--center__spaceB">
        <view>{{ $t("cha-ping-shuai") }}</view>
        <view class="row--center__left">
          <text class="fontsize-40 mr30 color-bf">{{ info.bad_rate }}%</text>
        </view>
      </view>
    </view>

    <view class="u-border-bottom pb35 pt35">
      <view class="row--center__spaceB mb40">
        <view>{{ $t("zhang-hu-yi-chuang-jian") }}</view>
        <view class="row--center__left">
          <text class="fontsize-40 mr30 color-bf">{{
            info.user_createtime_day
          }}</text>
          <text class="fontsize-22 color-999">{{ $t("tian-shu") }}</text>
        </view>
      </view>
      <view class="row--center__spaceB mb40">
        <view>{{ $t("shou-ci-jiao-yi-zhi-jin") }}</view>
        <view class="row--center__left">
          <text class="fontsize-40 mr30 color-bf">{{
            info.first_buy_day
          }}</text>
          <text class="fontsize-22 color-999">{{ $t("tian-shu-0") }}</text>
        </view>
      </view>
      <view class="row--center__spaceB mb45">
        <view>{{ $t("zong-cheng-dan-shu") }}</view>
        <view class="row--center__left">
          <text class="fontsize-40 mr30 color-bf">{{
            info.order_complete_all
          }}</text>
          <text class="fontsize-22 color-999">{{ $t("ci-shu-0") }}</text>
        </view>
      </view>
      <view class="row--center__right color-b0a1ec">
        {{
          ` ${$t("gou-mai")} ${info.order_buy_all} ${$t("chu-shou")}${
            info.order_sell_all
          } `
        }}
      </view>
    </view>
  </view>
</template>

<script>
import { getOrderUserInfo } from "@/api/transaction.js";

export default {
  data() {
    return {
      info: {},
    };
  },
  onLoad(options) {
    this.username = options.username || "HQ79747";
    this.getOrderUserInfo();
  },
  methods: {
    async getOrderUserInfo() {
      let { data } = await getOrderUserInfo({ username: this.username });
      this.info = data;
    },
  },
};
</script>

<style></style>
