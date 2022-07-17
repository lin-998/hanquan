<template>
  <view>
    <app-nav-bar custom background="#2c0d33">
      <view class="header">
        <view
          v-if="selectValue != 0"
          class="header-icon"
          @tap="selectValue = 0"
        >
          <u-icon name="arrow-left" size="30"></u-icon>
        </view>
        <view class="select-box">
          <u-input
            :value="selectText"
            type="select"
            border
            disabled
            height="60"
            :placeholder="$t('qing-shu-ru-nei-rong')"
            :custom-style="{ color: '#ccc' }"
            :select-open="selectShow"
            @click="selectClick"
          />
        </view>
        <view class="curreny">
          <view class="cur-left" @tap="toCurreny">
            <text class="mr10">{{ getCoin }}</text>
            <u-image
              width="30rpx"
              height="30rpx"
              src="@/static/qiehuan.png"
            ></u-image>
          </view>
          <view class="cur-right" @tap="toPayMethod">
            <text class="more">...</text>
          </view>
        </view>
      </view>
    </app-nav-bar>

    <view class="row--center__spaceB pt32 pl60 pr60">
      <view class="row--center__left color-ccc">
        <text :class="{ 'active-text': isBuy }" @tap="buyChange(true)">
          {{ $t("wo-yao-mai") }}
        </text>
        <text
          style="margin-left: 100rpx"
          :class="{ 'active-text': !isBuy }"
          @tap="buyChange(false)"
        >
          {{ $t("wo-yao-mai-0") }}
        </text>
      </view>
      <view class="row--center__left">
        <view class="relative">
          <u-image
            width="46rpx"
            height="46rpx"
            src="@/static/gengduo.png"
            @click="toOrder"
          ></u-image>
          <u-badge
            v-if="is_notice"
            :is-dot="true"
            :offset="[-5, -5]"
            type="error"
          ></u-badge>
        </view>
        <u-image
          width="46rpx"
          height="46rpx"
          src="@/static/shaixuan.png"
          class="ml20"
          @click="showFilter = true"
        ></u-image>
      </view>
    </view>

    <!-- 自选区 -->
    <view v-if="selectValue === 0">
      <view class="mt20">
        <u-tabs
          :list="tabList"
          :is-scroll="false"
          :current="current"
          active-color="#8D3D9D"
          inactive-color="#cccccc"
          bg-color="#2C0D33"
          bar-width="82"
          bar-height="4"
          @change="tabChange"
        ></u-tabs>
      </view>
      <trade-list :list="list" @btnClick="tradeClick"></trade-list>
    </view>

    <!-- 发布广告 -->
    <view v-if="selectValue === 1">
      <view class="pl30 pr30 mt45">
        <app-checkbox
          v-model="publishForm.coin_type"
          :list="checkList"
          @listChange="onChange"
        ></app-checkbox>
      </view>
      <view class="pl60 pr60">
        <input-filed
          v-model="publishForm.amount"
          :label="amountLabel"
          :placeholder="amountPlace"
        ></input-filed>
        <input-filed
          v-model="publishForm.uprice"
          :label="upriceLabel"
          :placeholder="upricePlace"
        ></input-filed>
        <!-- <input-filed :label="$t('xian-e')">
          <view class="row--center__left">
            <view class="input-wrap flex--1">
              <u-input
                v-model="publishForm.min_amount"
                :custom-style="inputStyle"
                :placeholder="$t('qing-shu-ru-nei-rong')"
              ></u-input>
            </view>
            <view class="input-line"></view>
            <view class="input-wrap flex--1">
              <u-input
                v-model="publishForm.max_amount"
                :custom-style="inputStyle"
                :placeholder="$t('qing-shu-ru-nei-rong')"
              ></u-input>
            </view>
          </view>
        </input-filed> -->
        <input-filed :label="amountTotalLabel">
          <template slot="right">
            <text v-if="!isBuy" class="fontsize-24" style="color: #f29209">
              {{ $t("servicecharge", { servicecharge }) + tabListName }}
            </text>
          </template>
          <view class="row--center__left">
            <view class="input-wrap flex--1">
              <u-input
                v-model="amountTotal"
                disabled
                :custom-style="inputStyle"
                :placeholder="$t('qing-shu-ru-nei-rong')"
              ></u-input>
            </view>
            <!-- <view class="count-switch" >
              <view class="mr20">
                {{
                  amount_type
                    ? $t("an-shu-liang-gou-mai")
                    : $t("an-jinegou-mai")
                }}
              </view>
              <u-image
                width="36rpx"
                height="36rpx"
                src="@/static/qirhuan_icon.png"
              ></u-image>
            </view> -->
          </view>
        </input-filed>
        <input-filed :label="$t('bei-zhu-shuo-ming')">
          <view class="input-wrap">
            <u-input
              v-model="publishForm.note"
              type="textarea"
              :placeholder="$t('qing-shu-ru-bei-zhu-shuo-ming')"
              :custom-style="inputStyle"
            ></u-input>
          </view>
        </input-filed>
        <view class="row--center__left">
          <view class="color-f6 mr60">{{
            $t("zhi-chi-shou-kuan-fang-shi")
          }}</view>
          <view class="input-wrap" style="width: 230rpx">
            <u-input
              type="select"
              :value="getPayName"
              disabled
              height="60"
              :placeholder="$t('pages.payment-type')"
              :custom-style="inputStyle"
              :select-open="paySelect"
              @click="paySelectClick"
            ></u-input>
          </view>
        </view>
        <view class="flex u-flex-wrap mt20">
          <u-tag
            v-for="(item, index) in selectPayList"
            :key="item.value"
            size="mini"
            mode="dark"
            :text="item.label"
            bg-color="#683BBC"
            closeable
            class="mr20"
            @close="payTagClick(index)"
          />
        </view>
        <view class="pt80 pb80">
          <app-button height="80rpx" @click="publishPoster">
            {{
              isBuy
                ? $t("fa-bu-gou-mai-guang-gao")
                : $t("fa-bu-sshou-guang-gao")
            }}
          </app-button>
        </view>
      </view>
    </view>

    <buy-com
      v-if="selectValue === 2"
      :orderid="orderid"
      :current="current"
      :is_warn="is_warn"
      @warnChange="warnShow = true"
    ></buy-com>

    <!-- 支付选择 -->
    <u-select
      v-model="paySelect"
      :list="payMethodList"
      label-name="name"
      value-name="pay_id"
      @confirm="paySelectChange"
    ></u-select>

    <!-- 筛选 -->
    <u-popup v-model="showFilter" mode="bottom">
      <view style="background-color: #341e3a; padding: 44rpx 30rpx 60rpx">
        <view class="row--center__right">
          <view class="flex--1 text-center">{{
            $t("guang-gao-shai-xuan")
          }}</view>
          <u-icon name="close" @click="showFilter = false"></u-icon>
        </view>

        <view class="mb40">
          <view class="color-bf mb30">{{ $t("zong-e") }}</view>
          <view class="input-wrap">
            <u-input
              v-model="query.money"
              :placeholder="$t('qing-shu-ru-zong-e')"
              :custom-style="{ 'font-size': '26rpx' }"
              placeholder-style="color: #666;"
              :clearable="false"
            ></u-input>
            <view class="color-999 fontsize-26 total-right">{{ getCoin }}</view>
          </view>
        </view>

        <view class="mt40">
          <view class="color-grey mb30">{{ $t("zhi-fu-fang-shi") }}</view>
          <app-checkbox
            v-model="query.pay_type"
            :list="payList"
            value-name="id"
            label-name="name"
          ></app-checkbox>
        </view>

        <view class="row--center__center">
          <app-button width="212rpx" height="70rpx" @click="resetQueryClick">
            {{ $t("zhong-zhi") }}
          </app-button>
          <app-button
            width="212rpx"
            height="70rpx"
            margin="0 0 0 106rpx"
            @click="filterClick"
          >
            {{ $t("que-ren") }}
          </app-button>
        </view>
      </view>
    </u-popup>

    <!-- 输入密码 -->
    <pwd-modal v-model="isPwd" @confirm="pwdConfirm"></pwd-modal>

    <!-- 绑定收款提示 -->
    <pwd-modal
      v-model="payMthodTips"
      :title="$t('ti-shi')"
      :content="$t('nin-huan-wei-bang-ding')"
      :is-pwd="false"
      :confirm-text="$t('bang-ding-shou-kuan-fang-shi')"
      confirm-width="220rpx"
      @confirm="payMethodConfirm"
    ></pwd-modal>
    <!-- 封号-警告弹窗 -->
    <u-popup
      v-model="warnShow"
      mode="center"
      width="583"
      border-radius="20"
      @close="show = false"
    >
      <view class="popup-wrap">
        <view class="title">警告</view>
        <view class="con-wrap">
          <view v-if="is_warn == 1" class="contain">
            <view class=""> 尊敬的会员，当前您含有超过付款时间 </view>
            <view class="">
              但是并<text class="text">未付款</text>的订单，请注意！
            </view>
          </view>
          <view v-if="is_warn == 2" class="contain">
            <view class="">
              尊敬的会员，由于您超时<text class="text">未付款</text>的订单较多，
            </view>
            <view class="">
              目前已被<text class="text">限制交易</text>，请联系管理员处理！
            </view>
          </view>

          <view class="btn-wrap">
            <AppButton width="186rpx" height="50rpx" @click="confirm">
              我已知晓
            </AppButton>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import pwdModal from "@/components/pwd-modal/pwd-modal.vue";
import BuyCom from "./buCom.vue";
import TradeList from "@/components/TradeList.vue";

import { mapGetters } from "vuex";
import { debounce } from "@/utils/tool.js";

import {
  tradeHall,
  createBuyOrder,
  calculationBuyPrice,
  calculationSellPrice,
  createSellOrder,
  userOrderNotice,
  userPayWarning,
} from "@/api/transaction.js";
import { getCoinPayList, getUserCoinPay } from "@/api/payMethod.js";

export default {
  components: {
    pwdModal,
    TradeList,
    BuyCom,
  },
  data() {
    return {
      warnShow: false,
      selectValue: 0,
      selectShow: false,
      selectList: [this.$t("zi-xuan-qu"), this.$t("fa-bu-guang-gao")],
      tabList: [
        {
          name: "PI",
          type: 2,
        },
        {
          name: "USDT",
          type: 1,
        },
        {
          name: "MYPI",
          type: 3,
        },
      ],

      tabListName: "USDT", //USDT、PI、MYPI
      list: [],
      current: 0,
      isBuy: true,
      showFilter: false,
      payList: [],
      total: "",
      payCurrent: 1,
      checkList: [
        { label: "USDT", value: 1 },
        { label: "PI", value: 2 },
        { label: "MYPI", value: 3 },
      ],
      form: {
        price: "",
      },
      inputStyle: { color: "#bfbfbf", "font-size": "26rpx" },
      paySelect: false,
      payMethodList: [],
      isPwd: false,
      payMthodTips: false,
      radioList: [
        {
          name: this.$t("an-jinegou-mai"),
          disabled: false,
        },
        {
          name: this.$t("an-shu-liang-gou-mai"),
          disabled: false,
        },
      ],
      radioValue: this.$t("an-jinegou-mai-0"),
      publishForm: {
        coin_type: 2, // 交易的币种类型
        amount_type: 1, // 购买的类型
        amount: "", // 购买金额/购买数量
        uprice: "", // 单价
        min_amount: "", // 最低限额
        max_amount: "", // 最高限额
        support_pay_id: "", // 收款方式
        pwd: "", // 密码
        note: "", // 备注
      },
      amount_type: false,
      amountTotal: "",
      servicecharge: "",
      query: {
        type: 1,
        coin_type: 1,
        money: "",
        pay_type: "all",
        page: 1,
        totalPage: undefined,
      },
      orderid: "",
      selectPayList: [],
      is_notice: false,
      is_warn: "", //未付款、封号警告
    };
  },
  onLoad() {
    this.getList();
    uni.$on("selectChange", (data) => {
      if (data.orderid) {
        this.orderid = data.orderid;
        this.isBuy = data.isBuy;
      }
      this.selectValue = data.selectValue;
    });
  },
  onShow() {
    this.getCoinPayList();
    this.getUserCoinPay();
    this.userOrderNotice();
    this.userPayWarning();
  },
  onReachBottom() {
    this.getList();
  },
  computed: {
    ...mapGetters(["getCoin"]),
    selectText() {
      return this.selectList[this.selectValue];
    },
    getPayName() {
      let id = this.publishForm.support_pay_id;
      let item = this.payMethodList.find((item) => item.id === id);
      return item && item.name;
    },
    getAmountTotal() {
      if (this.publishForm.amount && this.publishForm.uprice) {
        if (this.isBuy) {
          this.calculationBuyPrice();
        } else {
          this.calculationSellPrice();
        }
      }
      return this.publishForm.amount && this.publishForm.uprice;
    },
    amountLabel() {
      if (this.isBuy) {
        return this.amount_type
          ? this.$t("gou-mai-jin-e")
          : this.$t("gou-mai-shu-liang");
      } else {
        return this.amount_type
          ? this.$t("chu-shou-jin-e")
          : this.$t("chu-shou-shu-liang");
      }
    },
    amountPlace() {
      if (this.isBuy) {
        return this.$t("guadangoumai", {
          name: this.amount_type ? this.$t("jin-e") : this.$t("shu-liang"),
        });
      } else {
        return this.$t("guadanchushou", {
          name: this.amount_type ? this.$t("jin-e") : this.$t("shu-liang"),
        });
      }
    },
    upriceLabel() {
      return this.isBuy
        ? this.$t("gou-mai-dan-jia")
        : this.$t("chu-shou-dan-jia");
    },
    upricePlace() {
      return this.isBuy
        ? this.$t("qing-shu-ru-gua-dan")
        : this.$t("dan-chu-shou-dan-jia");
    },
    amountTotalLabel() {
      if (this.isBuy) {
        return this.amount_type
          ? this.$t("gou-mai-shu-liang")
          : this.$t("gou-mai-jin-e");
      } else {
        return this.amount_type
          ? this.$t("chu-shou-shu-liang")
          : this.$t("chu-shou-jin-e");
      }
    },
  },
  watch: {
    getAmountTotal() {
      if (this.isBuy) {
        this.calculationBuyPrice();
      } else {
        this.calculationSellPrice();
      }
    },
    getCoin() {
      this.resetGetList();
    },
  },
  async onPullDownRefresh() {
    await this.resetGetList();
    uni.stopPullDownRefresh();
  },
  methods: {
    async userPayWarning() {
      let { data } = await userPayWarning();
      this.is_warn = data.is_notice;
      if (this.is_warn != 0) {
        this.warnShow = true;
      }
    },
    confirm() {
      this.warnShow = false;
    },
    onChange(prop) {
      // console.log(prop)
      this.tabListName = prop.label;
      this.publishForm.coin_type = prop.value;
    },
    async getList() {
      let { page, totalPage } = this.query;
      if (page > totalPage) return;
      this.query.type = this.isBuy ? 2 : 1;
      let { data, totalpage } = await tradeHall(this.query);
      this.list.push(...data);
      this.query.page++;
      this.query.totalPage = totalpage;
    },
    async userOrderNotice() {
      let { data } = await userOrderNotice();
      let is_notice = data.is_notice === 1;
      console.log(this.is_notice);
      this.is_notice = is_notice;
    },
    tradeClick(item) {
      console.log(234);
      this.orderid = item.id;
      this.selectValue = 2;
    },
    async getCoinPayList() {
      let { data } = await getCoinPayList();
      // this.payMethodList = data;
      let payList = JSON.parse(JSON.stringify(data));
      payList.unshift({ id: "all", name: this.$t("quan-bu") });
      this.payList = payList;
    },
    async getUserCoinPay() {
      let { data } = await getUserCoinPay();
      this.payMethodList = data;
    },
    paySelectClick() {
      if (this.payMethodList.length === 0) {
        this.payMthodTips = true;
        return;
      }
      this.paySelect = true;
    },
    paySelectChange([e]) {
      let isFlag = this.selectPayList.some((item) => item.value === e.value);
      if (isFlag) {
        this.$toast(this.$t("nin-yi-jing-tian-jia-gai-shou-kuan-fang-shi"));
        return;
      }
      this.selectPayList.push(e);
    },
    payTagClick(index) {
      this.selectPayList.splice(index, 1);
    },
    buyChange(isBuy) {
      if (this.isBuy === isBuy || this.selectValue === 2) {
        return;
      }
      this.isBuy = !this.isBuy;
      if (this.selectValue === 0) {
        this.resetGetList();
      }
    },
    amountSwitch() {
      // this.amount_type = !this.amount_type;
      if (this.isBuy) {
        this.calculationBuyPrice();
      } else {
        this.calculationSellPrice();
      }
    },
    calculationSellPrice: debounce(async function () {
      let { amount, uprice, coin_type } = this.publishForm;
      let amount_type = this.amount_type ? 1 : 2;
      let { data } = await calculationSellPrice({
        amount_type,
        amount,
        uprice,
        coin_type,
      });
      console.log(data.num);
      this.amountTotal = data.num;
      this.servicecharge = data.servicecharge;
    }, 300),
    calculationBuyPrice: debounce(async function () {
      let { amount, uprice } = this.publishForm;
      let amount_type = this.amount_type ? 1 : 2;
      let { data } = await calculationBuyPrice({ amount_type, amount, uprice });
      this.amountTotal = data;
    }, 300),
    async pwdConfirm(value) {
      this.publishForm.pwd = value;
      this.publishForm.support_pay_id = this.selectPayList
        .map((item) => item.value)
        .toString();
      this.publishForm.amount_type = this.amount_type ? 1 : 2;
      if (this.isBuy) {
        await createBuyOrder(this.publishForm);
      } else {
        await createSellOrder(this.publishForm);
      }
      this.$toast(this.$t("fa-bu-cheng-gong"));
      this.isPwd = false;
      this.selectValue = 0;
    },
    publishPoster() {
      if (this.selectPayList.length === 0) {
        this.$toast(this.$t("qing-xuan-ze-shou-kuan-fang-shi"));
        return;
      }
      this.isPwd = true;
    },
    tabChange(index) {
      this.current = index;

      this.query.coin_type = this.tabList[index].type;
      this.amountSwitch();
      this.resetGetList();
    },
    async resetGetList() {
      this.query.page = 1;
      this.query.totalPage = undefined;
      this.list = [];
      await this.getList();
    },
    filterClick() {
      this.showFilter = false;
      this.resetGetList();
    },
    resetQueryClick() {
      this.query.money = "";
      this.query.pay_type = "all";
    },
    async selectClick() {
      this.selectShow = true;
      try {
        let { tapIndex } = await uni.showActionSheet({
          itemList: this.selectList,
        });
        this.selectValue = tapIndex;
      } finally {
        this.selectShow = false;
      }
    },
    payMethodConfirm() {
      this.payMthodTips = false;
      this.toPayMethod();
    },
    toCurreny() {
      uni.navigateTo({
        url: "/pagesA/pages/selectCurreny/selectCurreny",
      });
    },
    toPayMethod() {
      uni.navigateTo({
        url: "/pagesA/pages/payMethod/payMethod",
      });
    },
    toOrder() {
      uni.navigateTo({
        url: "/pagesB/pages/order/order",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2c0d33;
  position: relative;
  &-icon {
    position: absolute;
    top: 50%;
    left: 15rpx;
    transform: translateY(-50%);
    z-index: 99;
  }
}
.select-box {
  width: 220rpx;
  margin-left: 60rpx;
}
.curreny {
  display: flex;
  width: 226rpx;
  height: 60rpx;
  border: 2rpx solid #cccccc;
  border-radius: 30rpx;
  margin-right: 30rpx;
  .cur-left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 147rpx;
    height: 100%;
    border-right: 2rpx solid #cccccc;
  }
  .cur-right {
    flex: 1;
    height: 100%;
    position: relative;
  }
  .more {
    position: absolute;
    font-size: 48rpx;
    left: 50%;
    height: 30rpx;
    line-height: 30rpx;
    transform: translate(-50%, 0%);
  }
}
.active-text {
  font-size: 30rpx;
  font-weight: bold;
  color: #fff;
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
.total-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 30rpx;
}
.input-line {
  width: 36rpx;
  height: 4rpx;
  background: #45324a;
  border-radius: 10rpx;
  margin: 0 20rpx;
}
.count-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  width: 256rpx;
  height: 70rpx;
  color: #18bc18;
  background: #1f5e1f;
  border-radius: 10rpx;
  margin-left: 40rpx;
}
.popup-wrap {
  background-color: #341e3a;

  .title {
    height: 107rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1rpx solid rgba(245, 245, 245, 0.39);
    margin-bottom: 20rpx;
  }

  .contain {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 30rpx 44rpx 30rpx 44rpx;
    color: #bfbfbf;
    font-size: 24rpx;
    :nth-child(1) {
      margin-bottom: 10rpx;
    }
    .text {
      color: #cb1c1c !important;
    }
  }
  .btn-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30rpx 40rpx;
  }
}
</style>
