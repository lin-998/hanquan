<template>
  <view class="pl30 pr30">
    <view
      v-for="item in list"
      :key="item.id"
      class="row--center__left pb30 u-border-bottom"
    >
      <view class="flex--1 mt20">
        <view class="mb20">
          <text class="bold">{{ item.coin_type_text }}</text>
        </view>
        <view class="mb16">
          <text class="color-999 fontsize-22">{{ $t("dan-jia") }}</text>
          <text class="fontsize-26 ml20">{{ item.uprice }}</text>
        </view>
        <view class="mb16">
          <text class="color-999 fontsize-22">{{ $t("zong-e") }}</text>
          <text class="fontsize-26 ml20">{{ item.remain_amount }}</text>
        </view>
        <!-- <view class="mb16">
          <text class="color-999 fontsize-22">{{ $t("xian-e") }}</text>
          <text class="fontsize-26 ml20">{{
            `${item.coin_symbol}${item.minimum}-${item.coin_symbol}${item.maximum}`
          }}</text>
        </view> -->
        <view class="row--center__left">
          <view class="i-line"></view>
          <text class="fontsize-20 ml20">
            {{ item.support_pay_array[0].name }}
          </text>
        </view>
      </view>
      <app-button
        v-if="item.type === 1"
        type="danger"
        width="186rpx"
        height="60rpx"
        font-size="24"
        @click="btnClick(item)"
      >
        {{ $t("xiang-ta-chu-shou") }}
      </app-button>
      <app-button
        v-if="item.type === 2"
        type="success"
        width="186rpx"
        height="60rpx"
        font-size="24"
        @click="btnClick(item)"
      >
        {{ $t("xiang-ta-gou-mai") }}
      </app-button>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    btnClick(item) {
      this.$emit("btnClick", item);
    },
  },
};
</script>

<style scoped>
.i-line {
  width: 4rpx;
  height: 20rpx;
  background: #8d3d9d;
  border-radius: 9rpx;
}
</style>
