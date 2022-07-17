<template>
  <view class="buttons">
    <template v-if="info.state == 1">
      <AppButton width="590rpx" height="80rpx" @click="doCancelOrder">
        {{ $t("qu-xiao-ding-dan") }}
      </AppButton>
    </template>

    <template v-if="info.state == 2 && info.nickname_type === 2">
      <AppButton width="590rpx" height="80rpx" @click="doPay">
        {{ $t("que-ren-zhi-fu") }}
      </AppButton>
    </template>

    <template v-if="info.state == 3 && info.nickname_type === 1">
      <AppButton width="212rpx" height="70rpx" @click="toAppeal">
        {{ $t("ding-dan-shen-shu") }}
      </AppButton>
      <AppButton
        width="212rpx"
        height="70rpx"
        margin="0 0 0 106rpx"
        @click="toConfirm"
      >
        {{ $t("que-ren-ding-dan") }}
      </AppButton>
    </template>

    <template v-if="info.state == 4">
      <view class="text-center">
        <view class="fontsize-24 color-999">
          {{
            $t("qing-ning-dui-ping-jia", [
              info.nickname_type === 1 ? $t("mai-jia") : $t("mai-jia-0"),
            ])
          }}
        </view>
        <view class="mt42 row--center__center">
          <view class="btn" @tap="evaluateClick(1)">
            <u-icon name="thumb-up-fill"></u-icon>
            <text>{{ $t("hao-ping") }}</text>
          </view>
          <view class="btn" @tap="evaluateClick(2)">
            <u-icon name="thumb-down-fill"></u-icon>
            <text>{{ $t("cha-ping") }}</text>
          </view>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
/**
 * 底部按钮
 * @property {Number} status
 */
export default {
  // name: "Buttons",
  inject: ["info"],
  methods: {
    doCancelOrder() {
      this.$emit("actionClick", {
        action: "cancel",
      });
    },
    toAppeal() {
      uni.navigateTo({
        url: "/pagesB/pages/order/appeal?id=" + this.info.id,
      });
    },
    toConfirm() {
      this.$emit("actionClick", {
        action: "confirm",
      });
    },
    doPay() {
      this.$u.route({
        url: "/pagesB/pages/order/order-detail-deep",
        params: { id: this.info.id },
      });
    },
    evaluateClick(type) {
      this.$emit("actionClick", {
        action: "evaluate",
        data: {
          type,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.buttons {
  margin-top: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn {
  width: 190rpx;
  height: 60rpx;
  border-radius: 8rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #504678;
  &:last-child {
    margin-left: 120rpx;
    background-color: #45324a;
  }
}
</style>
