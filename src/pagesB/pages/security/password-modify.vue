<template>
  <view class="p30">
    <u-form ref="uForm" :model="form" label-position="top">
      <u-form-item
        v-for="(item, index) in FORM_ENTRY"
        :key="index"
        :label-style="{ color: '#F6F6F6' }"
        :label="item.label"
        :prop="item.prop"
        :border-bottom="false"
      >
        <template v-if="item.type == 'password'">
          <view class="input-wrap flex--1">
            <u-input
              v-model="form[item.prop]"
              type="password"
              :placeholder="item.plac"
              :custom-style="{ color: '#999999' }"
            ></u-input>
          </view>
        </template>
        <template v-else-if="item.type == 'code'">
          <view class="row--center__spaceB flex--1">
            <view class="input-wrap flex--1">
              <u-input
                v-model="form[item.prop]"
                type="text"
                :placeholder="item.plac"
                :custom-style="{ color: '#999999' }"
              ></u-input>
            </view>
            <view class="ml20">
              <time-tick :email="email" :type="mode"></time-tick>
            </view>
          </view>
        </template>
        <template v-else>
          <view class="input-wrap flex--1">
            <u-input
              v-model="form[item.prop]"
              type="text"
              :placeholder="item.plac"
              :custom-style="{ color: '#999999' }"
            ></u-input>
          </view>
        </template>
      </u-form-item>
    </u-form>

    <view class="fixed-bottom">
      <AppButton width="590rpx" height="80rpx" @click="submit">{{
        $t("ti-jiao")
      }}</AppButton>
    </view>
  </view>
</template>

<script>
import { uppass, uppaypsw } from "@/api/profile.js";
export default {
  data() {
    return {
      form: {
        password: "",
        rpassword: "",
        code: "",
      },
      FORM_ENTRY: [
        // {
        //   label: this.$t("you-xiang"),
        //   prop: "email",
        //   plac: this.$t("qing-shu-ru-you-xiang-0"),
        //   r: true,
        //   value: "",
        //   type: "text",
        // },
        {
          label: this.$t("xin-mi-ma"),
          prop: "password",
          plac: this.$t("qing-shu-ru-mi-ma-0"),
          r: true,
          value: "",
          type: "password",
        },
        {
          label: this.$t("que-ren-xin-mi-ma"),
          prop: "rpassword",
          plac: this.$t("qing-que-ren-mi-ma"),
          r: true,
          value: "",
          type: "password",
        },
        {
          label: this.$t("yan-zheng-ma"),
          prop: "code",
          plac: this.$t("qing-shu-ru-yan-zheng-ma"),
          r: true,
          value: "",
          type: "code",
        },
      ],
      email: "",
    };
  },
  onLoad(op) {
    this.op = op;
    this.initNavTitle();
    this.email = uni.getStorageSync("userInfo").email;
    this.$nextTick(this.initRules);
  },
  computed: {
    mode() {
      return this.op.type == 1 ? "retrieve" : "retrievepay";
    },
  },
  methods: {
    initNavTitle() {
      uni.setNavigationBarTitle({
        title:
          this.op.type == 1
            ? this.$t("xiu-gai-deng-lu-mi-ma")
            : this.$t("xiu-gai-zi-jin-mi-ma"),
      });
    },
    initRules() {
      let rules = {};
      this.FORM_ENTRY.forEach((f) => {
        let r = {};
        r.required = f.r;
        r.message = f.plac;
        r.trigger = "blur";
        rules[f.prop] = [r];
      });
      rules.rpassword.push({
        validator: (rule, value) => value == this.form.password,
        trigger: "blur",
        message: this.$t("que-ren-mi-ma-he-xin-mi-ma-bu-yi-zhi"),
      });
      if (this.op.type === "2") {
        rules.password.push({
          type: "number",
          len: 6,
          trigger: "blur",
          message: this.$t("zhi-fu-mi-ma-bi-xu-shi-6-wei-shu-zi"),
        });
        rules.rpassword.push({
          type: "number",
          len: 6,
          trigger: "blur",
          message: this.$t("zhi-fu-mi-ma-bi-xu-shi-6-wei-shu-zi"),
        });
      }
      this.$refs["uForm"].setRules(rules);
    },
    submit() {
      this.$refs["uForm"].validate((valid) => {
        if (!valid) return;
        if (this.op.type == 1) this.loginModify();
        else if (this.op.type == 2) this.paymentModify();
      });
    },
    loginModify() {
      let form = {};
      form.captcha = this.form.code;
      form.newpassword = this.form.password;
      form.renewpass = this.form.rpassword;
      uppass(form).then(() => {
        this.$toast(this.$t("xiu-gai-cheng-gong"));
        this.$store.dispatch("user/logout");
      });
    },
    paymentModify() {
      let form = {};
      form.captcha = this.form.code;
      form.newpaypwd = this.form.password;
      form.newpaypwd2 = this.form.rpassword;
      uppaypsw(form).then(() => {
        this.$toast(this.$t("xiu-gai-cheng-gong"));
        this.$back();
      });
    },
  },
};
</script>

<style lang="scss"></style>
