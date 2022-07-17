<template>
  <view class="profile">
    <view class="status-bar"></view>
    <view class="card card-header">
      <view class="flex border--bottom pb44" style="align-items: center">
        <u-avatar
          size="100"
          :src="userInfo.avatar"
          @click="toPage('account-set')"
        ></u-avatar>
        <view class="ml30 col--center__left" style="width: 100%">
          <view class="qrcode-wrap">
            <view class="">
              <text class="fontsize-22">{{
                $t("t-nickname", [$t("nickname")])
              }}</text>
              <text class="fontsize-26 ml20">{{ userInfo.nickname }}</text>
            </view>
            <u-image
              class="icon"
              src="@/static/erweima_icon.png"
              @click="imageClick"
            ></u-image>
          </view>
          <view class="mt12">
            <text class="fontsize-22">{{ $t("you-xiang-0") }}</text>
            <text class="fontsize-26 ml20">{{ userInfo.email }}</text>
          </view>
          <view class="mt12">
            <text class="fontsize-22">{{ $t("pi-di-zhi") }}:</text>
            <text class="fontsize-26 ml20 addr">{{ userInfo.pi_addr }}</text>
          </view>
          <!-- <view class="mt12">
            <text class="fontsize-22">{{ $t("dian-hua-hao-ma") }}:</text>
            <text class="fontsize-26 ml20">{{ userInfo.mobile }}</text>
          </view> -->
        </view>
      </view>
      <view class="mt40 row--center__spaceA">
        <text class="color-gren fontsize-26 bold" @click="toPage('cash-in')">
          {{ $t("pages.recharge") }}
        </text>
        <u-line direction="col" length="26"></u-line>
        <text class="color-yellow fontsize-26 bold" @click="toPage('cash-out')">
          {{ $t("pages.withdrawal") }}
        </text>
        <u-line direction="col" length="26"></u-line>
        <text class="color-blue fontsize-26 bold" @click="toPage('transfer')">
          {{ $t("pages.transfer") }}
        </text>
      </view>
    </view>

    <view class="mt40 flex u-flex-wrap justify-between">
      <view
        v-for="(item, index) in AMOUNT_MENU"
        :key="index"
        class="card mold"
        @click="toPage('amount-history', item)"
      >
        <view class="text-center fontsize-40">{{ item.label }}</view>
        <view class="mt30 text-center">
          <text class="fontsize-38 color-yellow">
            {{ item.value }}
          </text>
          <text class="ml20 fontsize-20">{{ $t("ming-xi") }}</text>
        </view>
      </view>
    </view>

    <u-cell-group :border="false">
      <u-cell-item
        v-for="(item, index) in MENU"
        :key="index"
        :title="item.label"
        :value="item.value"
        :title-style="{ color: '#ffffff' }"
        :arrow="!item.disabled"
        hover-class="none"
        @click="itemTap(item)"
      >
      </u-cell-item>
    </u-cell-group>

    <AppButton
      width="590rpx"
      height="80rpx"
      margin="50rpx auto"
      @click="logout"
    >
      {{ $t("tui-chu-deng-lu") }}
    </AppButton>
  </view>
</template>

<script>
let { statusBarHeight } = uni.getSystemInfoSync();

import { realnameInfo, payee_qrcode } from "@/api/profile.js";

export default {
  data() {
    return {
      AMOUNT_MENU: [
        {
          label: "USDT",
          value: "0.00",
          prop: "usdt",
        },
        {
          label: "PI",
          value: "0.00",
          prop: "pi",
        },
        {
          label: "MYPI",
          value: "0.00",
          prop: "mypi",
        },
        {
          label: this.$t("dong-jie-mypi"),
          value: "0.00",
          prop: "fmypi",
        },
      ],
      MENU: [
        {
          label: this.$t("wo-de-ding-dan"),
          value: "",
          prop: "order",
          disabled: false,
        },
        {
          label: "我的联系方式",
          value: "",
          prop: "myContact",
          disabled: false,
        },
        // {
        //   label: this.$t("an-quan-zhong-xin"),
        //   value: "",
        //   prop: "security",
        //   disabled: false,
        // },
        {
          label: this.$t("pages.security.realname"),
          value: "",
          prop: "realname",
          disabled: false,
        },
        // {
        //   label: this.$t("pages.invitation"),
        //   value: "",
        //   prop: "invitation",
        //   disabled: false,
        // },
        {
          label: this.$t("pages.expands"),
          value: "",
          prop: "extension",
          disabled: false,
        },
        {
          label: this.$t("pages.about-us"),
          value: "",
          prop: "about",
          disabled: false,
        },
        {
          label: this.$t("pages.contact-us"),
          value: "",
          prop: "contact",
          disabled: false,
        },
        {
          label: this.$t("an-quan-zhong-xin"),
          value: "",
          prop: "security",
          disabled: false,
        },
        // {
        //   label: "我的联系方式",
        //   value: "",
        //   prop: "myContact",
        //   disabled: false,
        // },

        {
          label: this.$t("pages.switch-lang"),
          value: "",
          prop: "lang",
          disabled: false,
        },
        {
          label: this.$t("ban-ben-hao"),
          value: "1.0",
          prop: "version",
          disabled: true,
        },
      ],
      userInfo: {},
      statusBarHeight,
      qrcodeSrc: "",
    };
  },
  onShow() {
    this.$store.dispatch("user/updataUserInfo").then(() => {
      this.userInfo = this.$store.getters.userInfo;
      this.fillValue(this.AMOUNT_MENU, "usdt", this.userInfo.credit1);
      this.fillValue(this.AMOUNT_MENU, "pi", this.userInfo.credit2);
      this.fillValue(this.AMOUNT_MENU, "mypi", this.userInfo.credit3);
      this.fillValue(this.AMOUNT_MENU, "fmypi", this.userInfo.credit4);
    });
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, (widget) => {
      this.fillValue(this.MENU, "version", widget.version);
    });
    // #endif
  },
  onLoad() {
    this.realnameInfo();
    this.payee_qrcode();
  },
  methods: {
    imageClick() {
      let imgArr = [];
      imgArr.push(this.qrcodeSrc);
      uni.previewImage({
        current: "",
        urls: imgArr,
      });
    },
    async payee_qrcode() {
      let token = uni.getStorageSync("token");
      let { data } = await payee_qrcode({ token });
      this.qrcodeSrc = data.qrcode;
    },
    async realnameInfo() {
      let { data } = await realnameInfo();
      if (data.is_apply === 0) return;
      let statusText = [
        this.$t("shen-he-zhong"),
        this.$t("yi-tong-guo"),
        this.$t("yi-ju-jue"),
      ];
      let status = data.realname_info.status;
      let text = statusText[status];
      let item = this.MENU[2];
      item.label = `${item.label} (${text})`;
      this.$set(this.MENU, 2, item);
    },
    itemTap(item) {
      if (item.disabled) return;
      this.toPage(item.prop);
    },
    toPage(name, item) {
      let params = {};
      if (item) {
        params.type = item.prop;
        params.value = item.value;
      }
      this.$u.route({
        url: `/pagesB/pages/${name}/${name}`,
        params,
      });
    },
    fillValue(list, name, value) {
      let idx = list.findIndex((l) => l.prop == name);
      if (idx !== -1) list[idx].value = value;
    },
    logout() {
      this.$store.dispatch("user/logout");
    },
  },
};
</script>

<style lang="scss" scoped>
.qrcode-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .icon {
    width: 46rpx;
    height: 46rpx;
  }
}

.profile {
  padding: 30rpx;
}

.card {
  border-radius: 8rpx;
  padding: 30rpx;
  background: linear-gradient(136deg, #7d3a8a 0%, #254292 100%);

  &-header {
    width: 100%;
  }

  &.mold {
    width: 330rpx;
    margin-bottom: 30rpx;
  }
}

.status-bar {
  height: var(--status-bar-height);
}
.addr {
  word-break: break-all;
  word-wrap: break-word;
}
</style>
