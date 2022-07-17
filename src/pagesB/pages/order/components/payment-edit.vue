<template>
  <view>
    <view class="payment-edit color-ccc">
      <view class="fontsize-22 color-999">
        {{ $t("zhang-hao-jin-hang-zhuan-zhang-bing-jie-tu", [current.name]) }}
      </view>
      <view class="mt40 row--center__spaceB">
        <view class="row--center__left">
          <u-image width="46" height="46" :src="current.logo_img"></u-image>
          <text class="ml10">{{ current.name }}</text>
        </view>
        <view style="width: 177rpx">
          <u-input
            v-model="current.name"
            type="select"
            height="60"
            border
            border-color="#888888"
            :custom-style="{ color: '#cccccc' }"
            :select-open="showPaymentType"
            @click="showPaymentType = true"
          ></u-input>
        </view>
      </view>
      <view class="row--center__spaceB mt24">
        <text>{{ $t("shou-kuan-ren") }}</text>
        <view class="row--center__right" @tap="copyRealname">
          <text class="mr10">{{ current.realname }}</text>
          <u-image
            width="36"
            height="36"
            src="/pagesB/static/fuzhi_icon@2x.png"
          ></u-image>
        </view>
      </view>

      <template v-if="[1, 2, 3].includes(current.pay_type)">
        <view class="row--center__spaceB mt24">
          <text>{{ $t("currentname-zhang-hao", [current.name]) }}</text>
          <view class="row--center__right" @tap="copyAccount">
            <text class="mr10">{{ getAccount }}</text>
            <u-image
              width="36"
              height="36"
              src="/pagesB/static/fuzhi_icon@2x.png"
            ></u-image>
          </view>
        </view>
        <view v-if="current.pay_type == 1">
          <text>{{ $t("kai-hu-yin-hang") }}</text>
          <view class="row--center__right" @tap="copybankname">
            <text class="mr10">{{ current.bank_name }}</text>
            <u-image
              width="36"
              height="36"
              src="/pagesB/static/fuzhi_icon@2x.png"
            ></u-image>
          </view>
        </view>
        <view v-else class="row--center__spaceB mt24" @tap="codeShow = true">
          <text>{{ $t("shou-kuan-ma") }}</text>
          <view class="row--center__right">
            <text class="btn-view">{{ $t("cha-kan") }}</text>
            <u-image
              width="36"
              height="36"
              src="/pagesB/static/erweima_icon@2x.png"
            ></u-image>
          </view>
        </view>

        <view class="row--center__spaceB mt24">
          <text>{{ $t("mai-jia-shi-ming-0") }}</text>
          <text>{{ current.realname }}</text>
        </view>
      </template>
    </view>
    <view class="public-contact">
      <view class="row--center__spaceB">
        <text class="color-ccc">卖家联系方式</text>
      </view>
      <view class="row--center__right color-ccc">
        <text class="mr10">{{ info.other_contact_info }}</text>
        <u-image width="36" height="36" :src="info.other_contact_img"></u-image>
      </view>
    </view>
    <view class="upload-proof">
      <view v-if="!form.payproof" class="upload" @tap="uploadClick">
        <u-icon name="plus-circle" size="86"></u-icon>
        <text>{{ $t("zheng-que-de-da-kuan-jie-tu") }}</text>
      </view>
      <u-image
        v-else
        width="318"
        height="194"
        :src="form.payproof"
        @click="uploadClick"
      ></u-image>
    </view>

    <view class="tips">
      {{ $t("zai-zhuan-zhang-guo-cheng-zhong-qing-wu-bei-zhu") }}
    </view>

    <view class="row--center__center mt60">
      <AppButton width="590rpx" height="80rpx" @click="payClick">
        {{ $t("que-ren-zhi-fu") }}
      </AppButton>
    </view>
    <view v-if="info.state" class="count_time">
      <text class="color-red">剩余支付时间 {{ countTime }}</text>
    </view>
    <u-select
      v-model="showPaymentType"
      :list="payList"
      value-name="id"
      label-name="name"
      @confirm="paySelect"
    ></u-select>

    <pwd-modal v-model="isPwd" @confirm="pwdConfirm"></pwd-modal>

    <u-popup v-model="codeShow" mode="center" width="500" border-radius="20">
      <view class="col--center__center p30">
        <view class="color-333 mb20 bold">{{ $t("shou-kuan-er-wei-ma") }}</view>
        <u-image width="300" height="300" :src="getCode"></u-image>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { uploadImage } from "@/utils/upload.js";
import { payOrder } from "@/api/order.js";
import { changetime } from "@/utils/day.js";

export default {
  name: "PaymentEdit",
  inject: ["info"],
  props: {
    payList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      countTime: "",
      second: "",
      current: {},
      showPaymentType: false,
      codeShow: false,
      img: "",
      form: {
        payproof: "",
        orderid: "",
        coin_pay_id: "",
        pwd: "",
      },
      isPwd: false,
    };
  },
  computed: {
    getAccount() {
      let types = {
        1: "bank_account",
        2: "alipay_account",
        3: "wx_account",
      };
      let typeName = types[this.current.pay_type];
      let account = this.current[typeName];
      return account;
    },
    getCode() {
      let types = {
        2: "alipay_qrcode",
        3: "wx_qrcode",
      };
      let typeName = types[this.current.pay_type];
      let code = this.current[typeName];
      return code;
    },
  },
  watch: {
    payList(val) {
      this.current = val[0];
    },
    second() {
      this.countTime = changetime(this.second);
    },
  },
  mounted() {
    console.log(this.info.pay_countdown);
    this.countDown();
  },
  methods: {
    countDown() {
      this.second = this.info.pay_countdown;
      this.timer = setInterval(() => {
        if (this.second === 0) {
          clearInterval(this.timer);
          if (this.info.state === 2) {
            this.$u.toast(this.$t("ding-dan-yi-guo-qi-wu-fa-jiao-yi"));
            setTimeout(() => {
              uni.switchTab({
                url: "/pages/tabbar/P2P/P2P",
              });
            }, 1500);
          }
          return;
        }
        this.second -= 1;
      }, 1000);
      return changetime(this.second);
    },

    copyRealname() {
      uni.setClipboardData({
        data: this.current.realname,
      });
    },
    copyAccount() {
      uni.setClipboardData({
        data: this.getAccount,
      });
    },
    copybankname() {
      uni.setClipboardData({
        data: this.current.bank_name,
      });
    },
    paySelect(e) {
      let id = e[0].value;
      this.current = this.payList.find((item) => item.id === id);
    },
    async uploadClick() {
      let url = await uploadImage();
      this.form.payproof = url;
    },
    payClick() {
      if (!this.form.payproof) {
        this.$toast(this.$t("qing-shang-chuan-zhi-fu-ping-zheng"));
        return;
      }
      this.isPwd = true;
    },
    async pwdConfirm(pwd) {
      this.form.pwd = pwd;
      this.form.orderid = this.info.id;
      this.form.coin_pay_id = this.current.pay_id;
      await payOrder(this.form);
      this.$toast(this.$t("zhi-fu-cheng-gong"));
      this.isPwd = false;
      setTimeout(uni.navigateBack.bind(uni), 1000, { delta: 2 });
    },
  },
};
</script>

<style scoped>
.count_time {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30rpx 0 60rpx 0;
}
.public-contact {
  background-color: #45324a;
  padding: 20rpx 40rpx;
  margin-top: 20rpx;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.payment-edit {
  background-color: #45324a;
  padding: 20rpx 40rpx;
  margin-top: 20rpx;
  border-radius: 8rpx;
}
.btn-view {
  margin-right: 10rpx;
  width: 128rpx;
  height: 60rpx;
  background-color: #1f5e1f;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8rpx;
  font-size: 22rpx;
  color: #18bc18;
}

.upload-proof {
  background-color: #45324a;
  padding: 20rpx 40rpx;
  margin-top: 20rpx;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.upload {
  width: 318rpx;
  height: 194rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2c0d33;
  border-radius: 8rpx;
  padding: 0 38rpx;
  font-size: 20rpx;
  color: #666666;
}

.tips {
  background-color: rgba(242, 146, 9, 0.09);
  padding: 20rpx 30rpx;
  margin-top: 40rpx;
  border-radius: 8rpx;
  color: #f29209;
  font-size: 20rpx;
}
</style>
