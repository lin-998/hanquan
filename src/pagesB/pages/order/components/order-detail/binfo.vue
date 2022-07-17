<template>
  <view class="binfo">
    <view>
      {{ info.order_type === 1 ? $t("gou-mai") : $t("chu-shou") }}
      {{ info.coin_type_text }}
    </view>
    <view class="mt22 color-ccc border-bottom pb30">
      <view class="row--center__spaceB">
        <text class="fontsize-26">{{ $t("zong-e") }}</text>
        <text class="fontsize-24">{{ `${info.coin_text} ${info.price}` }}</text>
      </view>
      <view class="row--center__spaceB mt20">
        <text class="fontsize-26">{{ $t("dan-jia") }}</text>
        <text class="fontsize-24">{{
          `${info.coin_text} ${info.uprice}`
        }}</text>
      </view>
      <view class="row--center__spaceB mt20">
        <text class="fontsize-26">{{ $t("shu-liang") }}</text>
        <text class="fontsize-24">
          {{ `${info.amount_num} ${info.coin_type_text}` }}
        </text>
      </view>
    </view>
    <view class="mt22 color-ccc mt30">
      <view class="row--center__spaceB">
        <text class="fontsize-26">{{ $t("ding-dan-hao") }}</text>
        <view class="row--center__right" @click="handleCopy">
          <text class="fontsize-24 mr10">{{ info.tradesn }}</text>
          <u-image
            width="36"
            height="36"
            src="/pagesB/static/fuzhi_icon@2x.png"
          ></u-image>
        </view>
      </view>
      <view class="row--center__spaceB mt20">
        <text class="fontsize-26">{{ $t("chuang-jian-shi-jian") }}</text>
        <text class="fontsize-24">{{ info.createtime }}</text>
      </view>
      <view class="row--center__spaceB mt20">
        <text class="fontsize-26">拍下时间</text>
        <text class="fontsize-24">{{ info.ordertime }}</text>
      </view>
      <view class="row--center__spaceB mt20">
        <text class="fontsize-26">付款时间</text>
        <text class="fontsize-24">{{ info.paytime }}</text>
      </view>
      <view class="row--center__spaceB mt20">
        <text class="fontsize-26">完成时间</text>
        <text class="fontsize-24">{{ info.dealtime }}</text>
      </view>
      <view class="row--center__spaceB mt20">
        <text class="fontsize-26">取消时间</text>
        <text class="fontsize-24">{{ info.losetime }}</text>
      </view>
      <view class="row--center__spaceB mt20">
        <text class="fontsize-26">
          {{
            info.nickname_type === 1
              ? $t("mai-jia-ni-cheng")
              : $t("mai-jia-ni-cheng-0")
          }}
        </text>
        <view class="row--center__right" @click="toUserInfo">
          <text class="fontsize-24 mr10">{{ info.other_nickname }}</text>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * 基本信息
 */
export default {
  // name: "Binfo",
  inject: ["info"],
  data() {
    return {};
  },
  methods: {
    handleCopy() {
      uni.setClipboardData({
        data: this.info.tradesn,
      });
    },
    toUserInfo() {
      let username = this.info.other_username;
      if (!username) return;
      uni.navigateTo({
        url: "/pagesA/pages/moreInfo/moreInfo?username=" + username,
      });
    },
  },
};
</script>

<style scoped>
.binfo {
  padding: 30rpx 40rpx 40rpx;
  background-color: #45324a;
  margin-top: 30rpx;
  border-radius: 8rpx;
}
</style>
