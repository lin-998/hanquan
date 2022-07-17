<template>
  <view>
    <view class="bg-wrap">
      <image src="/static/beijing_denglu@2x.png" class="image" />
    </view>
    <u-navbar
      :background="{ background: 'transparent' }"
      is-fixed
      immersive
      back-icon-name="close"
      back-icon-color="#FFFFFF"
    >
    </u-navbar>
    <view class="content">
      <view class="fontsize-40 bold mb60">{{ $t("zhu-ce") }}</view>

      <u-form
        ref="uForm"
        :model="form"
        :label-style="{ color: '#F6F6F6' }"
        label-position="top"
      >
        <u-form-item
          v-for="(f, index) in FORM_ENTRY"
          :key="index"
          :prop="f.prop"
          :label="f.label"
          :border-bottom="false"
        >
          <view
            v-if="['text', 'password'].includes(f.type)"
            class="input-wrap flex--1"
          >
            <u-input
              v-model="form[f.prop]"
              :placeholder="f.plac"
              :type="f.type"
              height="80"
              :trim="false"
            ></u-input>
          </view>

          <view v-else class="row--center__spaceB flex--1">
            <view class="input-wrap mr20">
              <u-input v-model="form[f.prop]" :placeholder="f.plac"></u-input>
            </view>
            <time-tick :email="form.email"></time-tick>
          </view>
        </u-form-item>
      </u-form>
      <view class="flex">
        <view style="display: flex" @click="selectAgreement">
          <u-image
            width="26"
            height="26"
            :src="checkIcon"
            style="margin-top: 2rpx"
          ></u-image>
          <text class="ml14">{{
            $t("dian-ji-gou-xuan-ji-dai-biao-tong-yi")
          }}</text>
        </view>
        <text class="color-yellow bold" @click="toAgreement">{{
          $t("zhu-ce-xie-yi")
        }}</text>
      </view>
      <view class="mt40">
        <AppButton width="590rpx" height="80rpx" @click="register">
          {{ $t("zhu-ce") }}
        </AppButton>
      </view>
    </view>
  </view>
</template>

<script>
import { register } from "@/api/login.js";
export default {
  data() {
    return {
      FORM_ENTRY: [
        {
          label: this.$t("yong-hu-ming"),
          value: "",
          plac: this.$t("qing-shu-ru-yong-hu-ming"),
          type: "text",
          r: true,
          prop: "nickname",
        },
        {
          label: this.$t("zhen-shi-xing-ming"),
          value: "",
          plac: this.$t("qing-shu-ru-zhen-shi-xing-ming"),
          type: "text",
          r: true,
          prop: "real_name",
        },
        // {
        //   label: this.$t("shen-fen-zheng-hao-ma"),
        //   value: "",
        //   plac: this.$t("qing-shu-ru-shen-fen-zheng-hao-ma"),
        //   type: "text",
        //   r: true,
        //   prop: "idcard",
        // },
        {
          label: this.$t("you-xiang"),
          value: "",
          plac: this.$t("qing-shu-ru-you-xiang-0"),
          type: "text",
          r: true,
          prop: "email",
        },
        {
          label: this.$t("mi-ma"),
          value: "",
          plac: this.$t("qing-shu-ru-mi-ma-0"),
          type: "password",
          r: true,
          prop: "password",
        },
        {
          label: this.$t("que-ren-mi-ma"),
          value: "",
          plac: this.$t("qing-shu-ru-mi-ma-0"),
          type: "password",
          r: true,
          prop: "password2",
        },
        {
          label: this.$t("jiao-yi-mi-ma"),
          value: "",
          plac: this.$t("qing-shu-ru-jiao-yi-mi-ma"),
          type: "password",
          r: true,
          prop: "paypwd",
        },
        {
          label: this.$t("que-ren-jiao-yi-mi-ma"),
          value: "",
          plac: this.$t("qing-shu-ru-jiao-yi-mi-ma"),
          type: "password",
          r: true,
          prop: "paypwd2",
        },
        {
          label: this.$t("tui-jian-ren"),
          value: "",
          plac: this.$t("qing-shu-ru-tui-jian-ren-id"),
          type: "text",
          r: false,
          prop: "tjid",
        },
        {
          label: this.$t("yan-zheng-ma"),
          value: "",
          plac: this.$t("qing-shu-ru-yan-zheng-ma"),
          type: "code",
          r: true,
          prop: "email_captcha",
        },
      ],
      form: {
        nickname: "",
        real_name: "",
        // idcard: "",
        email: "",
        password: "",
        paypwd: "",
        password2: "",
        paypwd2: "",
        tjid: "",
        email_captcha: "",
      },
      isAgreement: false,
    };
  },
	onLoad(option) {
		let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
		
		let curParam = routes[routes.length - 1].options; //获取路由参数
		console.log(curParam)
		// 拼接参数
		
		this.form.tjid=curParam.code
		
	},
  onReady() {
    let rules = {};
    this.FORM_ENTRY.forEach((item) => {
      rules[item.prop] = [
        {
          required: item.r,
          message: item.plac,
          trigger: "blur",
        },
      ];
    });
    rules.paypwd.push({
      type: "number",
      len: 6,
      trigger: "blur",
      message: this.$t("zhi-fu-mi-ma-bi-xu-shi-6-wei-shu-zi"),
    });

    rules.password2.push({
      trigger: "blur",
      message: this.$t("yu-mi-ma-bu-yi-zhi"),
      validator: (rule, value) => {
        return value === this.form.password;
      },
    });
    rules.paypwd2.push({
      trigger: "blur",
      message: this.$t("yu-jiao-yi-mi-ma-bu-yi-zhi"),
      validator: (rule, value) => {
        return value === this.form.paypwd;
      },
    });

    this.$refs["uForm"].setRules(rules);
  },
  computed: {
    checkIcon() {
      let name = this.isAgreement ? "xuanzhong_icon" : "weixuanzhong_icon";
      return `/static/${name}@2x.png`;
    },
  },
  methods: {
    async register() {
      let flag = await this.$refs["uForm"].validate();
      if (!flag) return;
      if (!this.isAgreement) {
        this.$toast(this.$t("qing-gou-xuan-zhu-ce-xie-yi"));
        return;
      }
      await register(this.form);
			this.$toast('注册成功')
      this.$u.route({
        url: "/pages/login/login",
        params: { account: this.form.email },
      });
    },
    selectAgreement() {
      this.isAgreement = !this.isAgreement;
    },
    toAgreement() {
      uni.navigateTo({
        url: "/pages/agreement/agreement",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.bg-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .image {
    width: 100%;
    height: 100%;
  }
}
.content {
  position: absolute;
  top: 80rpx;
  width: 100%;
  padding: 34rpx 80rpx 80rpx;
}
</style>
