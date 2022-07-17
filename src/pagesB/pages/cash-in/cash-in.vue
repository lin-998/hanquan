<template>
  <view class="p30">
    <u-navbar
      :title="$t('chong-zhi-usdt')"
      :background="{ background: 'transparent' }"
      title-color="#ffffff"
      back-icon-color="#ffffff"
    >
      <view slot="right" class="pr30 color-999" @click="toPage('history')">
        {{ $t("pages.history.recharge") }}
      </view>
    </u-navbar>

    <view class="tabs">
      <text :class="{ active: type == 1 }" @click="type = 1">TRC20-USDT</text>
      <text :class="{ active: type == 2 }" @click="type = 2">bep20-USDT</text>
    </view>

    <view class="row--center__center mt40">
      <view
        style="width: 480rpx; background-color: #45324a"
        class="radius-6px p40"
      >
        <view class="text-center">{{ $t("chong-bi-di-zhi") }}</view>
        <view class="row--center__center mt40">
          <u-image :src="getCode" width="256" height="256"></u-image>
        </view>
        <view class="break-word text-center mt40">
          {{ getAddr }}
        </view>
        <view class="mt60 row--center__center">
          <app-button width="264rpx" height="80rpx" @click="copyClick">{{
            $t("fu-zhi-di-zhi")
          }}</app-button>
        </view>
      </view>
    </view>

    <view class="mt40 color-grey">
      <view>{{ $t("zhu-yi-shi-xiang") }}</view>
      <view class="fontsize-22 mt20">
        <view>{{ $t("wu-fa-jin-hang-ti-bi-cao-zuo") }}</view>
        <view>{{ $t("fou-ze-zi-chan-jiang-bu-ke-zhao-hui") }}</view>
        <view> {{ $t("chong-zhi-zhi-shang-shu-di-zhi-hou") }} </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getinfo, createWallet } from "@/api/profile.js";

export default {
  data() {
    return {
      type: 1,
      info: {
        wallet_bep_addr: "",
        wallet_trc_addr: "",
        walletaddr_bep_qrcode: "",
        walletaddr_trc_qrcode: "",
      },
    };
  },
  onLoad() {
    this._getinfo();
  },
  computed: {
    getCode() {
      return this.type === 1
        ? this.info.walletaddr_trc_qrcode
        : this.info.walletaddr_bep_qrcode;
    },
    getAddr() {
      return this.type === 1
        ? this.info.wallet_trc_addr
        : this.info.wallet_bep_addr;
    },
  },
  methods: {
    async _createWallet() {
      if (this.info.is_open_wallet == 1 && !this.info.is_wallet) {
        let { data } = await createWallet();
        let {
          wallet_bep_addr,
          wallet_trc_addr,
          walletaddr_bep_qrcode,
          walletaddr_trc_qrcode,
        } = data;
        console.log(wallet_bep_addr);
        this.info.wallet_bep_addr = wallet_bep_addr;
        this.info.wallet_trc_addr = wallet_trc_addr;
        this.info.walletaddr_bep_qrcode = walletaddr_bep_qrcode;
        this.info.walletaddr_trc_qrcode = walletaddr_trc_qrcode;
      }
    },
    async _getinfo() {
      let { data } = await getinfo();
      let {
        is_open_wallet,
        wallet_bep_addr,
        wallet_trc_addr,
        walletaddr_bep_qrcode,
        walletaddr_trc_qrcode,
        is_set_contact,
        is_wallet,
      } = data;
      this.info = {
        is_open_wallet,
        wallet_bep_addr,
        wallet_trc_addr,
        walletaddr_bep_qrcode,
        walletaddr_trc_qrcode,
        is_set_contact,
        is_wallet,
      };
      this._createWallet();
    },
    toPage(name) {
      this.$u.route(`/pagesB/pages/cash-in/history`);
    },
    copyClick() {
      uni.setClipboardData({
        data: this.getAddr,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: space-between;

  text {
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
