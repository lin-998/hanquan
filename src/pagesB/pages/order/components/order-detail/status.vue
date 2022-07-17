<template>
  <view class="status">
    <view>
      <view :class="{ 'color-yellow': [2, 3].includes(info.state) }">
        {{ state.label }}
      </view>
      <view class="color-999 mt20 fontsize-24">{{ desc }}</view>
    </view>
    <u-image width="163" height="163" :src="fixIcon()"></u-image>
  </view>
</template>

<script>
import mock from "../../mock.js";
/**
 * @description 状态栏
 * @property {Number} status
 * @property {Number} sell
 */
export default {
  name: "Status",
  inject: ["info"],
  data() {
    return {
      STATUS_MAP: mock.STATUS_MAP,
    };
  },
  computed: {
    state() {
      return this.STATUS_MAP[this.info.state];
    },
    desc() {
      let desc = this.state.desc;
      if (!desc) return;
      if (typeof desc === "string") return desc;
      let text = desc.get(this.info.nickname_type);
      if (this.info.state == 4) {
        text += this.info.price + this.info.coin_text;
      }
      return text;
    },
  },
  methods: {
    fixIcon() {
      return `/pagesB/static/${this.state.icon}@2x.png`;
    },
  },
};
</script>

<style scoped>
.status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #45324a;
  border-radius: 8rpx;
  padding: 0 40rpx;
}
</style>
