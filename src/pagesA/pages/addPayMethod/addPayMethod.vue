<template>
  <view class="container">
    <u-form ref="uForm" :model="form" label-position="top">
      <u-form-item
        :label="$t('xing-ming')"
        :border-bottom="false"
        :label-style="labelStyle"
      >
        <view class="input-wrap">
          <u-input
            v-model="realname"
            :custom-style="inputStyle"
            disabled
          ></u-input>
        </view>
      </u-form-item>

      <u-form-item
        v-for="(item, index) in formList"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :border-bottom="false"
        :label-style="labelStyle"
      >
        <template v-if="item.type == 'upload'">
          <u-image
            v-if="form[item.prop]"
            width="250rpx"
            height="250rpx"
            :src="form[item.prop]"
            border-radius="20"
            @click="uploadClick(item)"
          ></u-image>
          <view v-else class="upload-box" @click="uploadClick(item)">
            <u-image
              width="86rpx"
              height="86rpx"
              src="/pagesA/static/upload-icon.png"
            ></u-image>
          </view>
        </template>
        <template v-else>
          <view class="input-wrap flex--1">
            <u-input
              v-model="form[item.prop]"
              :custom-style="inputStyle"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
            ></u-input>
          </view>
        </template>
      </u-form-item>
    </u-form>

    <view class="btn-box">
      <app-button type="primary" height="80rpx" @click="submit">
        {{ $t("bao-cun") }}
      </app-button>
    </view>

    <u-popup v-model="checkShow" mode="bottom">
      <view class="chek-wrap">
        <view class="row--center__spaceB mb40">
          <text>{{ $t("an-quan-yan-zheng") }}</text>
          <text class="color-ccc fontsize-26" @tap="checkShow = false">
            {{ $t("qu-xiao") }}
          </text>
        </view>
        <input-filed
          v-model="form.password"
          :label="$t('zi-jin-mi-ma')"
          :placeholder="$t('qing-shu-ru-zi-jin-mi-ma')"
          type="password"
        ></input-filed>
        <view class="mt30 fontsize-24" style="color: #f29209" @tap="pwdClick">
          {{ $t("wang-ji-mi-ma-0") }}
        </view>
        <view class="pl40 pr40" style="margin-top: 100rpx">
          <app-button height="80rpx" @click="confirmClick">
            {{ $t("que-ding") }}
          </app-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import {
  userSetCoinPay,
  getUserPay,
  userUpdateCoinPay,
} from "@/api/payMethod.js";
import { uploadImage } from "@/utils/upload.js";

export default {
  data() {
    return {
      form: {
        pay_id: "", //收款方式id
        password: "", //资金密码
        bank_account: "", // 银行卡号
        bank_name: "", // 开户银行
        bank_address: "", //开户地址
        alipay_account: "",
        alipay_qrcode: "",
        wx_account: "",
        wx_qrcode: "",
        other_pay_content: "",
        other_pay_img: "",
      },
      formList: [],
      inputStyle: { color: "#999999" },
      labelStyle: { color: "#f6f6f6" },
      realname: "",
      checkShow: false,
      banList: [
        {
          label: this.$t("yin-hang-ka-hao"),
          value: "",
          prop: "bank_account",
          type: "text",
          placeholder: this.$t("qing-shu-ru-yin-hang-ka-hao"),
          required: true,
        },
        {
          label: this.$t("kai-hu-yin-hang"),
          value: "",
          prop: "bank_name",
          type: "text",
          placeholder: this.$t("qing-shu-ru-kai-hu-yin-hang"),
          required: true,
        },
        {
          label: this.$t("kai-hu-di-zhi-xuan-tian"),
          value: "",
          prop: "bank_address",
          type: "text",
          placeholder: this.$t("qing-shu-ru-kai-hu-di-zhi"),
          required: false,
        },
      ],
      alipayList: [
        {
          label: this.$t("zhang-hao"),
          value: "",
          prop: "alipay_account",
          type: "text",
          placeholder: this.$t("qing-shu-ru-zhang-hao"),
          required: true,
        },
        {
          label: this.$t("tian-jia-shou-kuan-er-wei-ma-xuan-tian"),
          value: [],
          prop: "alipay_qrcode",
          type: "upload",
          placeholder: this.$t("qing-shang-chuan-ge-ren-xin-xi"),
          required: false,
        },
      ],
      wxList: [
        {
          label: this.$t("zhang-hao-0"),
          value: "",
          prop: "wx_account",
          type: "text",
          placeholder: this.$t("qing-shu-ru-zhang-hao-0"),
          required: true,
        },
        {
          label: this.$t("tian-jia-shou-kuan-er-wei-ma-xuan-tian-0"),
          value: [],
          prop: "wx_qrcode",
          type: "upload",
          placeholder: this.$t("qing-shang-chuan-ge-ren-xin-xi-0"),
          required: false,
        },
      ],
      otherList: [
        {
          label: this.$t("tian-jia"),
          value: "",
          prop: "other_pay_content",
          type: "text",
          placeholder: this.$t("qing-shu-ru-shou-kuan-xin-xi"),
          required: true,
        },
        {
          label: this.$t("tian-jia-shou-kuan-er-wei-ma-xuan-tian-0"),
          value: [],
          prop: "other_pay_img",
          type: "upload",
          placeholder: this.$t("qing-shang-chuan-ge-ren-xin-xi-0"),
          required: false,
        },
      ],
    };
  },
  onLoad(options) {
    let { id, name, edit } = options;
    let title = this.$t("tian-jia") + ` ${name}`;
    uni.setNavigationBarTitle({
      title,
    });
    this.edit = edit;
    this.otherList[0].label = title;
    this.form.pay_id = id;
    switch (id) {
      case "1":
        this.formList = this.banList;
        break;
      case "2":
        this.formList = this.alipayList;
        break;
      case "3":
        this.formList = this.wxList;
        break;
      default:
        this.formList = this.otherList;
        break;
    }
    let { realname = "" } = uni.getStorageSync("userInfo");
    this.realname = realname;
    if (this.edit) {
      this._getUserPay();
    }
  },
  mounted() {
    this.$nextTick(this.initRules);
  },
  methods: {
    async _getUserPay() {
      let { data } = await getUserPay({ pay_id: this.form.pay_id });
      this.form = data;
    },
    initRules() {
      let rules = {};
      this.formList.forEach((item) => {
        if (!item.required) return;
        rules[item.prop] = [
          {
            required: item.required,
            message: item.placeholder,
            trigger: "blur",
          },
        ];
      });
      this.$refs["uForm"].setRules(rules);
    },
    async submit() {
      let flag = await this.$refs["uForm"].validate();
      if (!flag) return;
      this.form.password = "";
      this.checkShow = true;
    },
    async uploadClick(item) {
      let url = await uploadImage();
      console.log();
      this.form[item.prop] = url;
    },
    async confirmClick() {
      if (!this.form.password) {
        return this.$toast(this.$t("qing-shu-ru-mi-ma-0"));
      }
      if (this.edit) {
        await userUpdateCoinPay(this.form);
      } else {
        await userSetCoinPay(this.form);
      }
      this.checkShow = false;
      this.$toast(this.$t("cao-zuo-cheng-gong"));
      setTimeout(() => {
        uni.navigateBack();
      }, 1000);
    },
    pwdClick() {
      uni.navigateTo({
        url: "/pagesB/pages/security/password-modify?type=2",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx 80rpx 0;
  box-sizing: border-box;
}
.btn-box {
  position: absolute;
  padding: 0 80rpx;
  width: 100%;
  bottom: 100rpx;
  left: 0;
}
.upload-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250rpx;
  height: 250rpx;
  background: #45324a;
  border-radius: 10rpx;
}
.chek-wrap {
  background: #341e3a;
  height: 580rpx;
  box-sizing: border-box;
  padding: 40rpx;
}
</style>
