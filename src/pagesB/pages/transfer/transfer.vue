<template>
  <view class="p30">
    <my-navbar :title="$t('pages.transfer')">
      <view slot="right" class="mr30" @click="toHistory">{{
        $t("pages.history.transfer")
      }}</view>
    </my-navbar>

    <view class="row--center__left">
      <text class="bold">{{ $t("hu-zhuan-zhang-hao") }}</text>
      <view class="ml20" style="width: 178rpx">
        <u-input
          v-model="form.typeLabel"
          type="select"
          border
          :custom-style="{ color: '#CCCCCC' }"
          @click="showType = true"
        ></u-input>
      </view>
    </view>

    <view class="mt30">
      <view class="bold">{{ $t("jie-shou-zhang-hao-you-jian") }}</view>
      <view class="input-wrap mt20">
        <u-input
          v-model="form.account"
          :placeholder="$t('jie-shou-zhang-hao-you-jian')"
          height="80"
        >
        </u-input>

        <u-image
          class="sao_icon"
          src="@/static/sao_icon.png"
          @click="scan"
        ></u-image>
      </view>
    </view>

    <view class="mt30">
      <text class="bold">{{ $t("zhuan-zhang-shu-liang") }}</text>
      <view class="input-wrap mt20">
        <u-input
          v-model="form.count"
          :placeholder="
            $t('zui-xiao-zhuan-chu-shu-liang-10-usdt') + form.typeLabel
          "
          height="80"
          type="number"
        ></u-input>
      </view>
    </view>
    <view class="fontsize-24 color-yellow mt20">{{ tips }}</view>

    <view class="mt30">
      <text class="bold">{{ $t("cao-zuo-ti-xing") }}</text>
      <view class="input-wrap mt20">
        <u-input
          v-model="form.remark"
          :placeholder="$t('cao-zuo-ti-xing-0')"
          height="80"
        ></u-input>
      </view>
    </view>

    <view class="fixed-bottom">
      <AppButton width="590rpx" height="80rpx" @click="handleShowPwd">
        {{ $t("que-ding") }}
      </AppButton>
    </view>

    <u-select
      v-model="showType"
      :list="TYPE_MAP"
      @confirm="typeChange"
    ></u-select>

    <pwd-modal ref="pwd-modal" v-model="showPwd" @confirm="submit"></pwd-modal>

    <u-popup v-model="infoShow" mode="center" width="583" border-radius="20">
      <view class="popup-wrap">
        <view class="title">{{ $t("que-ren-xin-xi") }}</view>
        <view class="con-wrap mt20">
          <view class="row--center__left mb20">
            <view class="mr20">{{ $t("nickname") }}</view>
            <view class="flex--1 input-wrap">
              <u-input
                v-model="confirmInfo.nickname"
                height="66"
                disabled
                placeholder-style="color: #666"
              ></u-input>
            </view>
          </view>
          <view class="row--center__left mb20">
            <view class="mr20">{{ $t("you-jian") }}</view>
            <view class="flex--1 input-wrap">
              <u-input
                v-model="confirmInfo.email"
                height="66"
                disabled
                placeholder-style="color: #666"
              >
              </u-input>
            </view>
          </view>
          <view class="btn-wrap">
            <AppButton
              type="primary"
              width="132rpx"
              height="50rpx"
              @click="infoShow = false"
            >
              {{ $t("qu-xiao") }}
            </AppButton>
            <AppButton width="132rpx" height="50rpx" @click="infoConfirm">
              {{ $t("que-ding") }}
            </AppButton>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
const TYPE_MAP = [
  {
    label: "USDT",
    value: 1,
  },
  {
    label: "PI",
    value: 2,
  },
  {
    label: "MYPI",
    value: 3,
  },
];
import { transfer, getAccepter } from "@/api/profile.js";
export default {
  data() {
    return {
      form: {
        type: 1,
      },
      showType: false,
      showPwd: false,
      TYPE_MAP,
      tips: "",
      infoShow: false,
      confirmInfo: {
        nickname: "",
        email: "",
      },
      email: "",
    };
  },
  onLoad() {
    this.form.typeLabel = TYPE_MAP[0].label;
    this.fixUseText();
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  methods: {
    scan() {
      // 允许从相机和相册扫码

      uni.scanCode({
        success: (res) => {
          let email = res.result.split("&")[1].split("=")[1];
          this.$set(this.form, "account", email);
        },
      });
    },
    typeChange(e) {
      this.form.type = e[0].value;
      this.form.typeLabel = e[0].label;
      this.fixUseText();
    },
    async handleShowPwd() {
      if (!this.form.account)
        return this.$toast(this.$t("qing-shu-ru-jie-shou-zhang-hao-0"));
      if (!Number(this.form.count) || this.form.count < 10)
        return this.$toast(this.$t("qing-shu-ru-da-yu-10-de-shu-liang"));

      let { data } = await getAccepter({
        account: this.form.account,
      });
      this.confirmInfo = data;
      this.infoShow = true;
    },
    fixUseText() {
      let amount = this.userInfo[`credit${this.form.type}`];
      this.tips = this.$t("ke-yong-amount-thisformtypelabel", [
        amount,
        this.form.typeLabel,
      ]);
    },
    submit(pwd) {
      let form = {};
      form.coin = "credit" + this.form.type;
      form.account = this.form.account;
      form.money = this.form.count;
      form.paypwd = pwd;
      transfer(form).then(() => {
        this.$toast(this.$t("cao-zuo-cheng-gong"));
        this.$refs["pwd-modal"].cancel();
        this.$back();
      });
    },
    infoConfirm() {
      this.infoShow = false;
      this.$nextTick(() => {
        this.showPwd = true;
      });
    },
    toHistory() {
      uni.navigateTo({
        url: "/pagesB/pages/transfer/transfer-history",
      });
    },
  },
};
</script>

<style lang="scss">
.popup-wrap {
  background-color: #341e3a;

  .title {
    height: 107rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1rpx solid rgba(245, 245, 245, 0.39);
  }

  .content {
    padding: 30rpx 0;
    text-align: center;
    color: #bfbfbf;
    font-size: 26rpx;
  }

  .btn-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx 40rpx;
  }

  .con-wrap {
    padding: 0 46rpx;
  }
}
</style>
