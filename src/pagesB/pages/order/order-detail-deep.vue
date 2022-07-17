<template>
  <view class="p30">
    <status></status>
    <template v-if="info.state == 2">
      <payment-edit :pay-list="payList"></payment-edit>
    </template>
    <payment-show v-else></payment-show>

    <!-- <tips :status="info.state"></tips>
    <buttons :status="info.state"></buttons> -->
  </view>
</template>

<script>
import Status from "./components/order-detail/status.vue";
import PaymentEdit from "./components/payment-edit.vue";
import PaymentShow from "./components/payment-show.vue";
// import Tips from "./components/order-detail/tips.vue";
// import Buttons from "./components/order-detail/buttons.vue";

import { detailOrder, getSellerPayInfo } from "@/api/order.js";

export default {
  components: { Status, PaymentEdit, PaymentShow },
  provide() {
    return {
      info: this.info,
    };
  },
  data() {
    return {
      info: {
        amount_num: "1.00",
        appeal_content: "",
        appeal_img: [],
        appraise_status: 0,
        coin_text: "CNY",
        coin_type_text: "USDT",
        createtime: "2022-01-17 13:46:26",
        id: 230,
        nickname_type: 1,
        order_type: 1,
        other_nickname: "小瘪三",
        other_username: "HQ29903",
        price: "1.00",
        state: 1,
        tradesn: "CB20220117134626662413",
        transaction: [],
        uprice: "1.00",
      },
      payList: [],
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.detailOrder();
  },
  methods: {
    async detailOrder() {
      let { data } = await detailOrder({ orderid: this.id });
      this.sell = data.order_type;
      this.status = data.state;
      this.info = Object.assign(this.info, data);
      if (this.info.state === 2) {
        this.getSellerPayInfo();
      }
    },
    async getSellerPayInfo() {
      let { data } = await getSellerPayInfo({ orderid: this.id });
      this.payList = data;
    },
  },
};
</script>

<style></style>
