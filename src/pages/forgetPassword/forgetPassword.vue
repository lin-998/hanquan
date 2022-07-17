<template>
  <view>
    <view class="bg-wrap">
      <image src="/static/beijing_denglu@2x.png" />
    </view>
    <u-navbar
      :background="{ background: 'transparent' }"
      is-fixed
      immersive
      back-icon-name="close"
      back-icon-color="#FFFFFF"
    >
      <!-- <text slot="right" class="mr30" @click="toRegister">{{
        $t("zhu-ce")
      }}</text> -->
    </u-navbar>
    <view class="content">
      <view class="fontsize-40 bold mb60">{{ $t("zhong-zhi-mi-ma") }}</view>

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
            ></u-input>
          </view>

          <view v-else class="row--center__spaceB flex--1">
            <view class="input-wrap mr20">
              <u-input v-model="form[f.prop]" :placeholder="f.plac"></u-input>
            </view>
            <time-tick :email="form.email" type="resetpwd"></time-tick>
          </view>
        </u-form-item>
      </u-form>

      <view class="mt40">
        <AppButton width="590rpx" height="80rpx" @click="submit">
          {{ $t("ti-jiao") }}
        </AppButton>
      </view>
    </view>
  </view>
</template>

<script>
import { resetpwd } from "@/api/profile.js";
export default {
  data() {
    return {
      FORM_ENTRY: [
        {
          label: this.$t("you-xiang"),
          value: "",
          plac: this.$t("qing-shu-ru-you-xiang-0"),
          type: "text",
          r: true,
          prop: "email",
        },
        {
          label: this.$t("you-xiang-yan-zheng-ma"),
          value: "",
          plac: this.$t("qing-shu-ru-you-xiang-yan-zheng-ma"),
          type: "code",
          r: true,
          prop: "captcha",
        },
        {
          label: this.$t("xin-mi-ma"),
          value: "",
          plac: this.$t("qing-shu-ru-xin-mi-ma"),
          type: "password",
          r: true,
          prop: "newpwd",
        },
        {
          label: this.$t("que-ren-xin-mi-ma"),
          value: "",
          plac: this.$t("qing-shu-ru-xin-mi-ma-0"),
          type: "password",
          r: true,
          prop: "newpwd2",
        },
      ],
      form: {},
    };
  },
  onReady() {
    let rules = {};
    this.FORM_ENTRY.forEach((f) => {
      let r = {};
      r.required = f.r;
      r.message = f.plac;
      r.trigger = "blur";
      rules[f.prop] = [r];
    });
    rules.newpwd2.push({
      validator: (rule, value) => this.form.newpwd == value,
      message: this.$t("que-ren-mi-ma-yu-xin-mi-ma-bu-yi-zhi"),
      trigger: "blur",
    });
    this.$refs["uForm"].setRules(rules);
  },
  methods: {
    submit() {
      this.$refs["uForm"].validate((valid) => {
        if (!valid) return;
        resetpwd(this.form).then(() => {
          this.$toast(this.$t("cao-zuo-cheng-gong"));
          this.$back();
        });
      });
    },
    toRegister() {
      uni.navigateTo({
        url: "/pages/register/register",
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
  image {
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
