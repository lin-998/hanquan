<template>
  <view class="p30">
    <view class="flex">
      <view class="mr20">
        <u-avatar size="40" :src="dataForm.avatar"></u-avatar>
      </view>
      <view class="flex--1 pb40 u-border-bottom">
        <view class="mb22">
          <text class="mr10">{{ dataForm.nickname }}</text>
          <text class="color-bf">{{ $t("ti-xing-nin") }}</text>
        </view>
        <view class="color-bf fontsize-26">
          {{ dataForm.note }}
        </view>
      </view>
    </view>
    <view class="pt30">
      <view class="mb22">{{ $t("gou-mai-usdt")+coinKindName }}</view>
      <view class="mb22">
        <text class="color-999 fontsize-24 mr20">{{ $t("dan-jia") }}</text>
        <text class="fontsize-26">{{
          coin_icon+$t("dataform-uprice", [dataForm.uprice])
        }}</text>
      </view>
      <u-radio-group v-model="form.amount_type" class="mb44">
        <u-radio
          v-for="(item, index) in radioList"
          :key="index"
          :name="item.value"
          active-color="#683BBC"
        >
          <text class="color-999 fontsize-26">{{ item.name }}</text>
        </u-radio>
      </u-radio-group>
      <view class="row--center__left mb30">
        <view class="input-wrap flex--1 mr30">
          <u-input
            v-model="form.amount"
            :placeholder="amountText"
            :custom-style="{ 'font-size': '26rpx' }"
            placeholder-style="color: #666;"
            :clearable="false"
          ></u-input>
          <view class="color-999 fontsize-26 total-right">{{ getCoin }}</view>
        </view>
        <app-button
          type="success"
          width="128rpx"
          height="60rpx"
          font-size="22"
          @click="buyAllClick"
        >
          {{ $t("quan-bu-mai-ru") }}
        </app-button>
      </view>
      <view class="pl30 pr30 fontsize-26">
        <!-- <view class="mb30">
          <text class="color-bf mr55">{{ $t("xian-e") }}</text>
          <text>{{ `￥${dataForm.minimum}-￥${dataForm.maximum}` }}</text>
        </view> -->
        <view class="pb30 row--center__spaceB u-border-bottom">
          <text class="color-bf">{{ $t("jiao-yi-shu-liang")}}</text>
          <view>
            <text>{{ dataForm.remain_amount }}</text>
            <text class="ml20 color-999">{{coinKindName}}</text>
          </view>
        </view>
        <view class="pt35 row--center__spaceB pb50">
          <text class="color-bf mr55">{{ $t("shi-fu-kuan") }}</text>
          <text class="fontsize-30">{{ coin_icon+totalPrice }}</text>
        </view>
      </view>
      <view class="wallet">
        {{ $t("wei-bao-hu-nin-de-zi-chan-an-quan-jiang") }}
      </view>
      <view class="row--center__spaceB pl40 pr40">
        <app-button type="primary" width="338rpx" height="70rpx">
          {{
            second === 0
              ? $t("order-timeout")
              : $t("secondshou-zi-dong-qu-xiao", [second])
          }}
        </app-button>
        <app-button width="212rpx" height="70rpx" @click="submitClick">
          {{ $t("xia-dan") }}
        </app-button>
      </view>
    </view>

    <pwd-modal v-model="isPwd" @confirm="pwdConfirm"></pwd-modal>
  </view>
</template>

<script>
import {
  getPayOrderDetail,
  orderSellOrder,
  orderBuyOrder,
} from "@/api/transaction.js";

import { mapGetters } from "vuex";

import pwdModal from "@/components/pwd-modal/pwd-modal.vue";

export default {
  components: {
    pwdModal,
  },
  props: {
    orderid: {
      type: [String, Number],
      default() {
        return "";
      },
    },
		current:{
			 type: [String, Number],
default:'',
		},
		is_warn:{
			type: [String, Number],
			default:'',
		}
  },
  data() {
    return {
      radioList: [
        // {
        //   name: this.$t("an-jinegou-mai-0"),
        //   value: 1,
        //   disabled: false,
        // },
        {
          name: this.$t("an-shu-liang-gou-mai"),
          value: 2,
          disabled: false,
        },
      ],
      isPwd: false,
      dataForm: {},
      form: {
        orderid: "",
        pwd: "",
        amount: "",
        amount_type: 2,
      },
      second: 60,
    };
  },
	
  computed: {
    ...mapGetters(["getCoin"]),
    totalPrice() {
      return this.form.amount * this.dataForm.uprice;
    },
    amountText() {
      return this.$t("qing-shu-ru-gou-mai", {
        name:
          this.form.amount_type === 1 ? this.$t("jin-e") : this.$t("shu-liang"),
      });
    },
		coinKindName(){
			return this.current==0?'PI':this.current==1?'USDT':this.current==2?'MYPI':''
		},
		coin_icon(){
			return uni.getStorageSync("coinIcon")
		}
  },
  watch: {
    orderid: {
      immediate: true,
      handler(val) {
        this.form.orderid = val;
        this.getDetail();
      },
    },
  },
  methods: {
    async getDetail() {
      try {
        let { data } = await getPayOrderDetail({ orderid: this.orderid });
        this.dataForm = data;
        this.countDown();
      } catch (e) {
        setTimeout(() => {
          uni.$emit("selectChange", {
            selectValue: 0,
          });
        }, 1500);
      }
    },
    countDown() {
      this.timer = setInterval(() => {
        if (this.second === 0) {
          clearInterval(this.timer);
          return;
        }
        this.second -= 1;
      }, 1000);
    },
    buyAllClick() {
      this.form.amount = this.dataForm.remain_amount;
    },
    submitClick() {
      if (this.second === 0) {
        this.$toast(this.$t("order-timeout"));
        return;
      }

      if (!this.form.amount) {
        this.$toast(this.$t("qing-shu-ru-nei-rong"));
        return;
      }
      this.isPwd = true;
    },
    async pwdConfirm(pwd) {
			if(this.is_warn==2){
				this.$emit('warnChange')
				 this.isPwd = false
				return
				}
      this.form.pwd = pwd;
      let requestFun =
        this.dataForm.type === 1 ? orderBuyOrder : orderSellOrder;
      let { data } = await requestFun(this.form);
      this.$toast(this.$t("xia-dan-cheng-gong"));
      this.isPwd = false;
      uni.$emit("selectChange", {
        selectValue: 0,
      });
      uni.navigateTo({
        url: "/pagesB/pages/order/order-detail?id=" + data.orderid,
      });
    },
  },
};
</script>

<style scoped>
.wallet {
  width: 100%;
  min-height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  color: #f29209;
  font-size: 24rpx;
  background: #572a2a;
  border-radius: 10rpx;
  margin-bottom: 40rpx;
}
</style>
