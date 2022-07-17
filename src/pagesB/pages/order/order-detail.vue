<template>
  <!-- 如果status正确, 这个文件可以不用修改, status映射查看 ./mock.js -->
  <view class="p30">
    <!-- 订单状态 -->
    <status :status="status" :sell="sell"></status>
    <!-- 订单详情 -->
    <binfo :info="info"></binfo>
    <!-- 卖家联系方式 -->
    <template v-if="[3].includes(status) && info.transaction">
      <view class="public-contact">
        <view class="row--center__spaceB">
          <text class="color-ccc">{{
            sell == 1 ? "卖家联系方式" : "买家联系方式"
          }}</text>
        </view>
        <view class="row--center__right color-ccc">
          <text class="mr10">{{ info.other_contact_info }}</text>
          <u-image
            width="36"
            height="36"
            :src="info.other_contact_img"
          ></u-image>
        </view>
      </view>
    </template>
    <!-- 交易方式 -->
    <template v-if="[3, 4, 10].includes(status) && info.transaction">
      <transition :status="status" :sell="sell"></transition>
    </template>
    <!--  -->
    <template v-if="[2].includes(status) && info.transaction">
      <text class="row--center__center mt40 color-red"
        >剩余支付时间 {{ countTime }}</text
      >
    </template>
    <!-- 上传截图 -->
    <template v-if="[2].includes(status) && sell == 0">
      <upload-proof></upload-proof>
    </template>
    <!-- 审核状态 -->
    <template v-if="[10].includes(status)">
      <appeal></appeal>
    </template>

    <template v-if="[1, 2, 3].includes(status)">
      <tips :status="status"></tips>
    </template>

    <template v-if="[1, 2, 3, 4].includes(status)">
      <buttons :status="status" @actionClick="actionClick"></buttons>
    </template>
    <pwd-modal
      v-model="receiveShow"
      :is-pwd="false"
      content="是否已经确认收到相应款项？"
      @confirm="receiveConfirm"
    ></pwd-modal>
    <pwd-modal v-model="isPwd" @confirm="pwdConfirm"></pwd-modal>
  </view>
</template>

<script>
import Appeal from "./components/order-detail/appeal.vue";
import Binfo from "./components/order-detail/binfo.vue";
import Buttons from "./components/order-detail/buttons.vue";
import Status from "./components/order-detail/status.vue";
import Tips from "./components/order-detail/tips.vue";
import Transition from "./components/order-detail/transition.vue";
import UploadProof from "./components/upload-proof.vue";
import { changetime } from "@/utils/day.js";

import {
  detailOrder,
  revokeOrder,
  dealOrder,
  appraiseOrder,
} from "@/api/order.js";

export default {
  components: { Appeal, Binfo, Buttons, Status, Tips, Transition, UploadProof },
  provide() {
    return {
      info: this.info,
    };
  },
  data() {
    return {
      second: "", //倒计时
      countTime: "", //倒计时
      receiveShow: false,
      status: 1,
      sell: 1,
      info: {
        amount_num: "1.00",
        appeal_content: "",
        appeal_img: [],
        appraise_status: 0,
        coin_text: "CNY",
        coin_type_text: "USDT",
        createtime: "",
        id: 230,
        nickname_type: 1,
        order_type: 1,
        other_nickname: "",
        other_username: "HQ29903",
        price: "1.00",
        state: 1,
        tradesn: "CB20220117134626662413",
        transaction: [],
        uprice: "1.00",
      },
      isPwd: false,
    };
  },
  watch: {
    second() {
      this.countTime = changetime(this.second);
    },
  },
  onLoad(options) {
    this.id = options.id;
    this.detailOrder();
  },
  mounted() {
    this.countDown();
  },
  methods: {
    countDown() {
      this.second = this.info.pay_countdown;
      this.timer = setInterval(() => {
        if (this.second === 0) {
          clearInterval(this.timer);
          return;
        }
        this.second -= 1;
        if (this.status == 2 && this.second == 0) {
          this.$u.toast(this.$t("ding-dan-yi-guo-qi-wu-fa-jiao-yi"));
          setTimeout(() => {
            uni.switchTab({
              url: "/pages/tabbar/P2P/P2P",
            });
          }, 1500);
        }
      }, 1000);
      return changetime(this.second);
    },
    receiveConfirm() {
      this.isPwd = true;
      this.receiveShow = false;
    },

    async detailOrder() {
      let { data } = await detailOrder({ orderid: this.id });
      console.log(data);
      this.sell = data.order_type;
      this.status = data.state;
      this.info = Object.assign(this.info, data);
      this.second = this.info.pay_countdown;
    },
    actionClick(e) {
      if (e.action === "cancel") {
        this.handleCancel();
        this.action = "cancel";
      } else if (e.action === "confirm") {
        this.receiveShow = true;
        this.action = "confirm";
      } else if (e.action === "evaluate") {
        this.appraiseOrder(e.data);
      }
    },
    pwdConfirm(pwd) {
      this.isPwd = false;
      if (this.action === "confirm") {
        this.dealOrder(pwd);
      }
    },
    async dealOrder(pwd) {
      let data = {
        pwd,
        orderid: this.id,
      };
      await dealOrder(data);
      this.$toast(this.$t("que-ren-cheng-gong"));
      setTimeout(uni.navigateBack.bind(uni), 1000);
    },
    async appraiseOrder({ type }) {
      await appraiseOrder({ orderid: this.id, type });
      this.$toast(this.$t("ping-jia-cheng-gong"));
    },
    async handleCancel() {
      let { cancel } = await uni.showModal({
        title: this.$t("ti-shi"),
        content: this.$t("shi-fou-que-ren-qu-xiao"),
      });
      if (cancel) return;
      let { code, msg } = await revokeOrder({ orderid: this.id });
      if (code === 101) {
        let { cancel } = await uni.showModal({
          title: this.$t("ti-shi"),
          content: msg,
        });
        if (cancel) return;
        await revokeOrder({ orderid: this.id, is_confirm: 1 });
      }
      this.$toast(this.$t("qu-xiao-cheng-gong"));
      setTimeout(uni.navigateBack.bind(uni), 1000);
    },
  },
};
</script>

<style>
.public-contact {
  background-color: #45324a;
  padding: 20rpx 40rpx;
  margin-top: 20rpx;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
