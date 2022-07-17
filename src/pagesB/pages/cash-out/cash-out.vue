<template>
  <view>
    <my-navbar
      :title="$t('ti-bi')"
      :right-text="$t('pages.history.withdrawal')"
      @right-click="toPage('history')"
    ></my-navbar>

    <view class="p30">
      <view class="color-f6">{{ $t("ti-bi-di-zhi") }}</view>
      <view class="mt20">
        <view class="input-wrap">
          <u-input
            v-model="form.address"
            height="80"
            :custom-style="{ color: '#ffffff' }"
            :placeholder="$t('qing-shu-ru-nei-rong')"
          ></u-input>
          <u-image
            width="46"
            height="46"
            src="/pagesB/static/sao_icon@2x.png"
            @click="scanClick"
          ></u-image>
        </view>
      </view>

      <view class="mt36">{{ $t("ti-bi-wang-luo") }}</view>
      <view class="tabs mt20">
        <text
          class="tabs-text"
          :class="{ active: type == 1 }"
          @click="type = 1"
        >
          TRC20
        </text>
        <text
          class="tabs-text"
          :class="{ active: type == 2 }"
          @click="type = 2"
        >
          bep20
        </text>
      </view>

      <view class="mt36 row--center__spaceB">
        <text>{{ $t("ti-bi-shu-liang") }}</text>
        <text class="color-yellow fontsize-24">{{
          `${$t("ke-yong")} ${total} USDT`
        }}</text>
      </view>
      <view class="mt20 row--center__spaceB">
        <view class="input-wrap flex--1">
          <u-input
            v-model="form.amount"
            height="80"
            :placeholder="
              $t('zui-xiao-shu-ru-shu-liang-wei-infousdtmin', [info.usdt_min])
            "
          ></u-input>
        </view>
        <view class="ml30">
          <AppButton
            background-color="#138813"
            width="128rpx"
            height="60rpx"
            font-size="22"
            @click="totalClick"
          >
            {{ $t("quan-bu-ti-bi") }}
          </AppButton>
        </view>
      </view>

      <view class="mt36">
        <text>{{ $t("shou-xu-fei") }}</text>
        <text class="ml20 fontsize-24 color-grey">{{ usdtFee }}USDT</text>
      </view>

      <view class="mt64 fontsize-22 color-999">
        <view>{{
          `● ${$t("zui-xiao-ti-bi-shu-liang-wei")} ${info.usdt_min}USDT`
        }}</view>
        <view> {{ $t("nao-ji-liu-lan-qi-an-quan-fang-zhi") }} </view>
      </view>
    </view>

    <view
      class="mt80 row--center__spaceB pl30 pr30"
      style="background-color: #45324a; height: 68rpx"
    >
      <text>{{ $t("shi-ji-dao-zhang") }}</text>
      <text>{{ actualTotal }} USDT</text>
    </view>

    <AppButton
      width="590rpx"
      height="80rpx"
      margin="86rpx auto"
      @click="validate"
    >
      {{ $t("ti-bi-0") }}
    </AppButton>

    <pwd-modal v-model="isPwd" @confirm="submit"></pwd-modal>
  </view>
</template>

<script>
import { getinfo, withdrawalConfig, withdrawal } from "@/api/profile.js";

export default {
  data() {
    return {
      type: 1,
      isPwd: false,
      form: {
        walletType: 1,
        paypwd: "",
        amount: "",
        address: "",
      },
      total: 0,
      info: {
        usdt_min: 1,
        usdt_fee: 0.01,
      },
    };
  },
  onLoad() {
    this._getinfo();
    this.withdrawalConfig();
  },
  computed: {
    usdtFee() {
      return this.info.usdt_fee.toFixed(2);
    },
    actualTotal() {
      return this.form.amount - this.usdtFee;
    },
  },
  methods: {
    async withdrawalConfig() {
      let { data } = await withdrawalConfig();
      this.info = data.usdt;
    },
    async _getinfo() {
      let { data } = await getinfo();
      this.total = data.credit1;
    },
    async scanClick() {
      let { result } = await uni.scanCode();
      this.form.address = result;
    },
    totalClick() {
      this.form.amount = this.total;
    },
    validate() {
      if (!this.form.amount) {
        this.$toast(this.$t("qing-shu-ru-shu-liang"));
        return;
      }
      this.isPwd = true;
    },
    async submit(pwd) {
      this.form.paypwd = pwd;
      this.form.walletType = this.type === 1 ? "trc" : "bep";
      await withdrawal(this.form);
      this.isPwd = false;
      this.$toast(
        this.$t("ti-bi-shen-qing-cheng-gong-qing-deng-dai-shen-he-tong-guo")
      );
    },
    toPage(name) {
      this.$u.route(`/pagesB/pages/cash-out/${name}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: space-between;

  &-text {
    width: 310rpx;
    height: 70rpx;
    background-color: #683bbc;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    color: #666666;
    &.active {
      color: #ffffff;
    }
  }
}
</style>
