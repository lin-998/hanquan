<template>
  <view class="container">
    <u-swipe-action
      v-for="(item, index) in list"
      :key="item.id"
      :show="item.show"
      :index="index"
      :options="options"
      bg-color="#341e3a"
      class="mb30"
      style="border-radius: 10rpx"
      @click="actionClick"
    >
      <view class="pay-item" @tap.stop="editClick(item)">
        <view class="row--center__left mb26">
          <u-image width="46rpx" height="46rpx" :src="item.logo_img"></u-image>
          <view class="ml20 fontsize-26">{{ item.name }}</view>
        </view>
        <template v-if="item.pay_type === 1">
          <view class="mb22">
            <text class="fontsize-22 color-999">{{
              $t("yin-hang-ka-ming-cheng")
            }}</text>
            <text class="ml30 color-bf fontsize-24">{{ item.bank_name }}</text>
          </view>
          <view>
            <text class="fontsize-22 color-999">{{
              $t("yin-hang-ka-hao")
            }}</text>
            <text class="ml30 color-bf fontsize-24">{{
              item.bank_account
            }}</text>
          </view>
        </template>

        <template v-if="item.pay_type === 2">
          <view>
            <text class="fontsize-22 color-999">{{
              $t("zhi-fu-bao-zhang-hao")
            }}</text>
            <text class="ml30 color-bf fontsize-24">{{
              item.alipay_account
            }}</text>
          </view>
        </template>

        <template v-if="item.pay_type === 3">
          <view>
            <text class="fontsize-22 color-999">{{
              $t("wei-xin-zhang-hao")
            }}</text>
            <text class="ml30 color-bf fontsize-24">{{ item.wx_account }}</text>
          </view>
        </template>

        <template v-if="item.pay_type === 4">
          <view>
            <text class="fontsize-22 color-999">{{ $t("qi-ta-xin-xi") }}</text>
            <text class="ml30 color-bf fontsize-24">{{
              item.other_pay_content
            }}</text>
          </view>
        </template>
      </view>
    </u-swipe-action>
    <view class="btn-wrap">
      <app-button height="80rpx" @click="addClick">{{
        $t("tian-jia")
      }}</app-button>
    </view>
    <!-- 输入密码 -->
    <pwd-modal v-model="isPwd" @confirm="pwdConfirm"></pwd-modal>
  </view>
</template>
<script>
import { getUserCoinPay, userDeleteCoinPay } from "@/api/payMethod.js";

import pwdModal from "@/components/pwd-modal/pwd-modal.vue";

export default {
  components: {
    pwdModal,
  },
  data() {
    return {
      list: [],
      isPwd: false,
      options: [
        {
          text: this.$t("shan-chu"),
          style: {
            backgroundColor: "#dd524d",
          },
        },
      ],
      pay_id: "",
    };
  },
  onShow() {
    this.getUserCoinPay();
  },
  methods: {
    async getUserCoinPay() {
      let { data } = await getUserCoinPay();
      this.list = data;
    },
    actionClick(index) {
      let item = this.list[index];
      this.pay_id = item.pay_id;
      this.isPwd = true;
    },
    editClick(item) {
      let { pay_id, name } = item;
      uni.navigateTo({
        url: `/pagesA/pages/addPayMethod/addPayMethod?id=${pay_id}&name=${name}&edit=1`,
      });
    },
    async pwdConfirm(password) {
      let data = { pay_id: this.pay_id, password };
      await userDeleteCoinPay(data);
      this.isPwd = false;
      this.$toast(this.$t("cao-zuo-cheng-gong"));
      this.getUserCoinPay();
    },
    addClick() {
      uni.navigateTo({
        url: "/pagesA/pages/payList/payList",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx 60rpx;
  position: relative;
  min-height: 100vh;
}
.pay-item {
  background: #341e3a;
  border-radius: 10rpx;
  padding: 30rpx;
  // margin-bottom: 30rpx;
}
.btn-wrap {
  width: 590rpx;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
