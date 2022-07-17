<template>
  <view>
    <AppButton
      type="warning"
      v-bind="$attrs"
      :width="toUnit(width)"
      :height="toUnit(height)"
      @click="handleShowGraph"
    >
      {{ code }}
    </AppButton>
    <u-popup v-model="showGraph" mode="center" border-radius="12" width="532">
      <view class="popup-wrap">
        <view class="title">{{ $t("qing-nin-tian-xie-yan-zheng-ma") }}</view>
        <view class="row--center__spaceB pr40 pl40 pt40">
          <view class="input-wrap" style="width: 252rpx; height: 66rpx">
            <u-input
              v-model="imgcaptcha"
              :placeholder="$t('qing-shu-ru-yan-zheng-ma')"
              height="66"
            ></u-input>
          </view>
          <u-image
            width="160"
            height="65"
            :src="imgUrl"
            @click="reflashCode"
          ></u-image>
        </view>
        <view class="row--center__center pb40 pt40">
          <AppButton width="132rpx" height="50rpx" @click="fetchCode">
            {{ $t("que-ren") }}
          </AppButton>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { send } from "@/api/common.js";
/**
 * @description 发送验证码
 * @property {String} email
 * @property {String} type = [register|resetpwd|retrieve]
 */
export default {
  name: "TimeTick",
  inheritAttrs: false,
  props: {
    email: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "register",
    },
    width: {
      type: Number,
      default: 128,
    },
    height: {
      type: Number,
      default: 60,
    },
    background: {
      type: String,
      default: "#F29209",
    },
  },
  data() {
    return {
      code: this.$t("dian-ji-fa-song"),
      showGraph: false,
      imgcaptcha: "",
      host: process.env.VUE_APP_API,
      imgUrl: "",
    };
  },
  methods: {
    handleShowGraph() {
      if (!this.$u.test.email(this.email))
        return this.$toast(this.$t("qing-shu-ru-zheng-que-de-you-xiang"));

      if (this.timer) return this.$toast(this.$t("qing-shao-hou-zai-shi"));
      this.reflashCode();
      this.showGraph = true;
    },
    reflashCode() {
      this.identifier = new Date().getTime();
      this.imgUrl =
        this.host + "/api/Captcha/get?identifier=" + this.identifier;
    },
    fetchCode() {
      if (!this.imgcaptcha) {
        this.$toast(this.$t("qing-shu-ru-yan-zheng-ma"));
        return;
      }
      let form = {
        email: this.email,
        imgcaptcha: this.imgcaptcha,
        identifier: this.identifier,
        vtime: this.identifier,
        event: this.type,
      };
      send(form).then(() => {
        this.$toast(this.$t("yan-zheng-ma-yi-fa-song"));
        this.showGraph = false;
        this.timeTick();
      });
    },
    timeTick() {
      let code = 60;
      this.timer = setInterval(() => {
        code--;
        this.code = `${code}s`;
        if (code <= 0) {
          clearInterval(this.timer);
          this.code = this.$t("dian-ji-fa-song");
          this.timer = null;
        }
      }, 1000);
    },
    toUnit(num) {
      return num + "rpx";
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-wrap {
  background-color: #341e3a;
  .title {
    font-size: 26rpx;
    color: #ffffff;
    height: 107rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1rpx solid rgba($color: #f5f5f5, $alpha: 0.2);
  }
}
</style>
