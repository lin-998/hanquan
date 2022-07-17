<template>
  <view class="payment-show">
    <view class="row--center__spaceB color-ccc fontsize-26">
      <text>{{ $t("zhi-fu-fang-shi") }}</text>
      <text>{{ info.transaction.pay_text }}</text>
    </view>
    <view class="row--center__spaceB mt20 color-ccc fontsize-26">
      <text>{{ $t("fu-kuan-ren") }}</text>
      <text>{{ info.transaction.pay_user }}</text>
    </view>
    <view class="row--center__spaceB mt20 color-ccc fontsize-26">
      <text>{{ $t("fu-kuan-zhang-hao") }}</text>
      <view class="row--center__right">
        <text class="mr10">{{ info.transaction.pay_account }}</text>
        <u-image
          width="36"
          height="36"
          src="/pagesB/static/fuzhi_icon@2x.png"
        ></u-image>
      </view>
    </view>
    <view class="row--center__spaceB mt20 color-ccc fontsize-26">
      <text>{{ $t("mai-jia-shi-ming") }}</text>
      <text>{{ info.transaction.pay_account }}</text>
    </view>
    <view class="row--center__spaceB mt20 color-ccc fontsize-26">
      <text>{{ $t("mai-jia-you-xiang") }}</text>
      <text>{{ info.transaction.buy_email }}</text>
    </view>
    <view class="row--center__spaceB mt20 color-ccc fontsize-26">
      <text>买家联系方式</text>
      <view class="row--center__right">
        <text class="mr10">{{ info.other_contact_info }}</text>
        <u-image width="36" height="36" :src="info.other_contact_img"></u-image>
      </view>
    </view>

    <view class="border-bottom pb30 mb30"></view>

    <view class="flex">
      <text class="fontsize-26 color-ccc">{{ $t("zhi-fu-ping-zheng") }}</text>
      <view class="ml20">
        <u-image
          :src="info.transaction.payproof"
          width="200"
          height="200"
          @click="previewImage"
        ></u-image>
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
  name: "PaymentShow",
  inject: ["info"],
  methods: {
    //图片查看
    previewImage() {
      let imgArr = [];
      imgArr.push(this.info.transaction.payproof);
      uni.previewImage({
        current: "",
        urls: imgArr,
      });
    },
  },
};
</script>

<style scoped>
.payment-show {
  background-color: #45324a;
  padding: 20rpx 40rpx;
  margin-top: 20rpx;
  border-radius: 8rpx;
}
</style>
