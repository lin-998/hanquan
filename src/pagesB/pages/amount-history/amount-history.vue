<template>
  <view>
    <my-navbar :title="$t('cai-wu-ji-lu')" background="#2C0D33">
      <u-image
        slot="right"
        width="46"
        height="46"
        src="/pagesB/static/shaixuan@2x.png"
        @click="showFilters = true"
      ></u-image>
    </my-navbar>

    <u-sticky>
      <view class="sub-title">
        <text class="fontsize-40">{{ op.value }}</text>
        <text class="ml20">{{ subTitle }}</text>
      </view>
    </u-sticky>

    <view class="p30">
      <mescroll-body @init="mescrollInit" @down="downCallback" @up="upCallback">
        <view
          v-for="item in list"
          :key="item.id"
          class="row--center__spaceB border-bottom pb30 mb30"
        >
          <view class="row--center__left flex-shrink-0" style="width: 206rpx">
            <u-image width="36" height="36" :src="findIcon(item.num)"></u-image>
            <text class="ml20">{{ findLabel(item.project) }}</text>
          </view>
          <view class="flex--1">
            <view class="flex fontsize-22 color-999">
              <text class="flex--1 text-center">{{ $t("shu-liang") }}</text>
              <text class="flex--1 text-center">{{ $t("zhuang-tai") }}</text>
              <text class="flex--1 text-center">{{ $t("shi-jian") }}</text>
            </view>
            <view class="flex fontsize-24 mt20 color-ccc">
              <text class="flex--1 text-center">{{ item.num }}</text>
              <text class="flex--1 text-center">{{
                filterStatus(item.status)
              }}</text>
              <text class="flex--1 text-center">{{ item.createtime }}</text>
            </view>
          </view>
        </view>
      </mescroll-body>
    </view>

    <u-popup v-model="showFilters" mode="bottom">
      <view class="popup-wrap">
        <view
          v-for="(item, index) in FILTERS"
          :key="index"
          class="inner-cell"
          @click="selectFilter(item)"
          >{{ item.label }}</view
        >
      </view>
    </u-popup>
  </view>
</template>

<script>
const TYPE_MAP = {
  usdt: 1,
  pi: 2,
  mypi: 3,
  fmypi: 4,
};
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import { Ccdetails } from "@/api/profile.js";

export default {
  mixins: [MescrollMixin],
  data() {
    return {
      showFilters: false,
      FILTERS: [
        { label: this.$t("hou-tai-cao-zuo"), prop: "", value: 1 },
        { label: this.$t("pages.withdrawal"), prop: "withdraw", value: 2 },
        {
          label: this.$t("qian-bao-chong-zhi"),
          prop: "wallet_recharge",
          value: 3,
        },
        {
          label: this.$t("hou-tai-chong-zhi"),
          prop: "system_recharge",
          value: 4,
        },
        { label: this.$t("tui-guang-jiang-li"), prop: "bonus", value: 5 },
        { label: this.$t("mai-ru"), prop: "buy", value: 6 },
        { label: this.$t("mai-chu"), prop: "sell", value: 7 },
        { label: this.$t("zhuan-ru"), prop: "transfer_in", value: 8 },
        { label: this.$t("zhuan-chu"), prop: "transfer_out", value: 9 },
        { label: this.$t("ren-zheng-zhuan-xiang"), prop: "award", value: 10 },
        { label: this.$t("hou-tai-cao-zuo-0"), prop: "back", value: 11 },
        { label: this.$t("tou-zi"), prop: "invest", value: 12 },
      ],
      list: [],
      subTitle: "USDT",
      form: {
        page: 1,
        type: 1,
        project: "",
      },
      status: [
        this.$t("shen-he-zhong"),
        this.$t("yi-wan-cheng"),
        this.$t("yi-ju-jue"),
      ],
    };
  },
  onLoad(op) {
    this.op = op;
    this.subTitle = op.type.toUpperCase();
    if (op.type == "fmypi") this.subTitle = "MYPI";
    this.form.type = TYPE_MAP[op.type];
  },
  methods: {
    filterStatus(status) {
      return this.status[status];
    },
    selectFilter(e) {
      this.form.project = e.prop;
      this.mescroll.resetUpScroll();
      this.showFilters = false;
    },
    upCallback(page) {
      if (page.num == 1) this.list = [];
      this.form.page = page.num;
      Ccdetails(this.form).then((res) => {
        this.list = this.list.concat(res.data);
        let len = res.data.length;
        let totalpage = res.totalpage;
        this.mescroll.endByPage(len, totalpage);
      });
    },
    findLabel(type) {
      let filter = this.FILTERS.find((l) => l.prop == type) || {};
      return filter.label;
    },
    findIcon(num) {
      let number = Number(num);
      let name = number > 0 ? "shouru_icon" : "zhichu_icon";
      // let name = [
      //   "back",
      //   "wallet_recharge",
      //   "bonus",
      //   "transfer_in",
      //   "buy",
      //   "award",
      // ].includes(project)
      //   ? "shouru_icon"
      //   : "zhichu_icon";
      return `/pagesB/static/${name}@2x.png`;
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-wrap {
  background-color: #341e3a;
}
.inner-cell {
  height: 100rpx;
  border-bottom: 1rpx solid rgba($color: #f5f5f5, $alpha: 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.border-bottom {
  border-bottom: 1rpx solid rgba($color: #f5f5f5, $alpha: 0.2);
}
.sub-title {
  background-color: #2c0d33;
  height: 110rpx;
  border-bottom: 1rpx solid rgba($color: #f5f5f5, $alpha: 0.2);
  margin-bottom: 30rpx;
  color: #18bc18;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
