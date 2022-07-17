<template>
  <u-popup
    v-model="show"
    mode="center"
    width="583"
    border-radius="20"
    @close="cancel"
  >
    <view class="popup-wrap">
      <view class="title">{{ title }}</view>
      <view class="con-wrap">
        <view class="content">{{ content }}</view>
        <view v-if="isPwd" class="input-wrap mb40">
          <u-input
            v-model="password"
            :placeholder="$t('qing-shu-ru-nin-de-mi-ma')"
            height="66"
            type="password"
            placeholder-style="color: #666"
          ></u-input>
        </view>
        <view class="btn-wrap">
          <AppButton
            type="primary"
            width="132rpx"
            height="50rpx"
            @click="cancel"
          >
            {{ cancelText }}
          </AppButton>
          <AppButton :width="confirmWidth" height="50rpx" @click="confirm">
            {{ confirmText }}
          </AppButton>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
/**
 * 密码弹框
 * @property {String} title
 * @property {String} content
 * @property {String} confirm-btn-text
 * @property {String} cancel-btn-text
 * @example <pwd-modal v-model="show" />
 */
import i18 from "@/locale/i18.js";
export default {
  name: "PwdModal",
  props: {
    title: { type: String, default: i18.t("que-ren-ding-dan") },
    content: {
      type: String,
      default: i18.t("qing-shu-ru-nin-de-zi-jin-mi-ma"),
    },
    confirmText: { type: String, default: i18.t("que-ding") },
    confirmWidth: { type: String, default: "132rpx" },
    cancelText: { type: String, default: i18.t("qu-xiao") },
    value: { type: Boolean, default: false },
    isPwd: { type: Boolean, default: true },
  },
  data() {
    return {
      show: false,
      password: "",
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.show = val;
        if (val && this.isPwd) {
          this.password = "";
        }
      },
    },
  },
  methods: {
    cancel() {
      this.$emit("input", false);
      this.password = "";
    },
    confirm() {
      if (!this.password && this.isPwd)
        return this.$toast(this.$t("qing-shu-ru-mi-ma-0"));
      this.$emit("confirm", this.password);
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-wrap {
  background-color: #341e3a;

  .title {
    height: 107rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1rpx solid rgba(245, 245, 245, 0.39);
  }

  .content {
    padding: 30rpx 0;
    text-align: center;
    color: #bfbfbf;
    font-size: 26rpx;
  }

  .btn-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx 40rpx;
  }
  .con-wrap {
    padding: 0 46rpx;
  }
}

::v-deep {
  .u-mode-center-box {
    background-color: #341e3a;
  }
}
</style>
