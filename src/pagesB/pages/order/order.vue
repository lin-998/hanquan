<template>
  <view class="p30">
    <my-navbar :title="$t('pages.order.history')" background="#2C0D33">
      <view slot="right" @click="showFilter = true">
        <u-image
          width="46"
          height="46"
          src="/pagesB/static/shaixuan@2x.png"
        ></u-image>
      </view>
    </my-navbar>

    <mescroll-body @init="mescrollInit" @down="downCallback" @up="upCallback">
      <view v-for="item in list" :key="item.id" class="border-bottom pb20 mb20">
        <view class="row--center__spaceB">
          <view>
            <text class="bold">
              {{ item.order_type === 1 ? $t("gou-mai") : $t("chu-shou") }}
            </text>
            <text class="ml10">{{ item.coin_type_text }}</text>
          </view>
          <view style="color: #b0a1ec" @click="toDetail(item)">
            <text
              class="pr20"
              :class="{
                'color-yellow': item.state === 2 || item.state === 3,
                'color-gren': item.state === 4,
                'color-grey': item.state === 20,
                'color-red': item.state === 30,
              }"
            >
              {{ item.state | statusText }}
            </text>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </view>
        <view class="fontsize-22 color-999 flex mt22">
          <text class="flex--1 text-center">{{ $t("shi-jian") }}</text>
          <text class="flex--1 text-center">{{
            `${$t("shu-liang")}(${item.coin_type_text})`
          }}</text>
          <text class="flex--1 text-center">{{
            `${$t("jiao-yi-zong-e")}(${item.coin_text})`
          }}</text>
        </view>
        <view class="fontsize-24 color-ccc flex mt20">
          <text class="flex--1 text-center">{{
            `${item.hi} ${item.month}/${item.day}`
          }}</text>
          <text class="flex--1 text-center">{{ item.amount_num }}</text>
          <text class="flex--1 text-center">{{ item.price }}</text>
        </view>
        <view class="mt20 color-666">{{ item.u_nickname }}</view>
      </view>
    </mescroll-body>

    <u-popup v-model="showFilter" mode="bottom">
      <view style="background-color: #341e3a; padding: 44rpx 30rpx 60rpx">
        <view class="row--center__spaceB">
          <u-icon name="arrow-left" @click="showFilter = false"></u-icon>
          <u-image
            width="46"
            height="46"
            src="/pagesB/static/shaixuan@2x.png"
          ></u-image>
        </view>

        <view v-for="(item, index) in FILTER_MAP" :key="index">
          <view class="color-grey mt10 mb30">{{ item.label }}</view>
          <app-checkbox
            v-model="form[item.prop]"
            :list="item.list"
          ></app-checkbox>
        </view>

        <view class="row--center__center">
          <AppButton width="212rpx" height="70rpx" @click="resetClick">
            {{ $t("zhong-zhi") }}
          </AppButton>
          <AppButton
            width="212rpx"
            height="70rpx"
            margin="0 0 0 106rpx"
            @click="selectFilter"
          >
            {{ $t("que-ren") }}
          </AppButton>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import mock from "./mock.js";
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import { orderList } from "@/api/order.js";
import i18 from "@/locale/i18.js";
const STATUS_MAP = new Map([
  [1, i18.t("dai-jie-dan")],
  [2, i18.t("wei-fu-kuan")],
  [3, i18.t("yi-fu-kuan")],
  [4, i18.t("yi-wan-cheng")],
  [10, i18.t("shen-su-zhong")],
  [20, i18.t("yi-guo-qi")],
  [30, i18.t("yi-qu-xiao")],
]);

export default {
  filters: {
    statusText(status) {
      return STATUS_MAP.get(status);
    },
  },
  mixins: [MescrollMixin],
  data() {
    return {
      showFilter: false,
      list: [],
      FILTER_MAP: mock.FILTER_MAP,
      form: {
        coin_type: "",
        type: "",
        state: "",
        page: 1,
      },
    };
  },
  onShow() {
    if (this.mescroll) {
      this.mescroll.triggerDownScroll();
    }
  },
  methods: {
    resetClick() {
      this.form = {
        coin_type: "",
        type: "",
        state: "",
        page: 1,
      };
    },
    selectFilter() {
      this.showFilter = false;
      this.mescroll.resetUpScroll();
    },
    toDetail(item) {
      this.$u.route({
        url: "/pagesB/pages/order/order-detail",
        params: { id: item.id },
      });
    },
    async upCallback(page) {
      if (page.num == 1) this.list = [];
      this.form.page = page.num;
      let { data, totalpage } = await orderList(this.form);
      this.list.push(...data);
      let len = data.length;
      this.mescroll.endByPage(len, totalpage);
    },
  },
};
</script>

<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1rpx solid rgba($color: #f5f5f5, $alpha: 0.2);
}
.title {
  color: #bfbfbf;
  margin-top: 40rpx;
}
.tag-item {
  width: 210rpx;
  height: 70rpx;
  background-color: #45324a;
  color: #999999;
  border-radius: 8rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
  transition: all 0.2s;

  &:not(:nth-child(3n)) {
    margin-right: calc((100% - 630rpx) / 2);
  }

  &.active {
    color: #ffffff;
    background-color: #7053a7;
  }
}
</style>
