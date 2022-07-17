<template>
  <view>
    <view v-for="item in list" :key="item.id" class="trade">
      <view class="mr20">
        <u-avatar
          size="40"
          :src="item.avatar"
          @click="avatarClick(item)"
        ></u-avatar>
      </view>
      <view class="flex--1">
        <view class="row--center__spaceB">
          <text class="bold" @tap="avatarClick(item)">{{ item.nickname }}</text>
          <view class="color-999 fontsize-20">
            {{
              `${item.order_quantity} ${$t("ding-dan")} ${
                item.order_completion_rate
              }%`
            }}
          </view>
        </view>
        <view class="row--center__left">
          <view class="flex--1">
            <view class="mt14 mb14 fontsize-22 color-999">
              {{ $t("dan-jia") }}
            </view>
            <view class="mb20">
              <text class="fontsize-40 mr20 bold">{{ item.uprice }}</text>
              <text class="color-999 fontsize-20">{{ getCoin }}</text>
            </view>
            <view class="mb16">
              <text class="color-999 fontsize-22">{{ $t("shu-liang") }}</text>
              <text class="fontsize-26 ml20">{{ item.remain_amount }}</text>
            </view>
            <!-- <view class="mb16">
              <text class="color-999 fontsize-22">{{ $t("xian-e") }}</text>
              <text class="fontsize-26 ml20">{{
                `￥${item.minimum}-￥${item.maximum}`
              }}</text>
            </view> -->
            <view class="row--center__left">
              <view class="i-line"></view>
              <text class="fontsize-20 ml20">
                {{ item.support_pay_array | getPayText }}
              </text>
            </view>
          </view>
          <app-button
            v-if="item.type === 2"
            type="success"
            width="132rpx"
            height="60rpx"
            @click="btnClick(item)"
          >
            {{ $t("gou-mai") }}
          </app-button>
          <app-button
            v-if="item.type === 1"
            type="danger"
            width="132rpx"
            height="60rpx"
            @click="btnClick(item)"
          >
            {{ $t("chu-shou") }}
          </app-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  filters: {
    getPayText(arr) {
      return arr.map((item) => item.name).join(" ");
    },
  },
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
  computed: {
    ...mapGetters(["getCoin"]),
  },
  methods: {
    btnClick(item) {
      this.$emit("btnClick", item);
    },
    avatarClick(item) {
      uni.navigateTo({
        url: "/pagesA/pages/personInfo/personInfo?username=" + item.uuname,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.trade {
  display: flex;
  padding: 30rpx;
  .i-line {
    width: 4rpx;
    height: 20rpx;
    background: #8d3d9d;
    border-radius: 9rpx;
  }
}
</style>
