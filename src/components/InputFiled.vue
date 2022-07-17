<template>
  <view class="filed">
    <view class="filed-title">
      <text>{{ label }}</text>
      <slot name="right"></slot>
    </view>
    <slot>
      <view class="input-filed">
        <input
          :type="type"
          value=""
          :placeholder="getPlace"
          placeholder-style="color: #999"
          class="input-text"
          @input="inputChange"
        />
      </view>
    </slot>
  </view>
</template>

<script>
export default {
  name: "InputFiled",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  data() {
    return {};
  },
  computed: {
    getPlace() {
      return this.placeholder && this.$t("qing-shu-ru-nei-rong");
    },
  },
  methods: {
    inputChange(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style scoped>
.filed {
  margin-bottom: 30rpx;
}
.filed-title {
  font-size: 28rpx;
  margin-bottom: 20rpx;
  color: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input-filed {
  position: relative;
  box-sizing: border-box;
  padding: 0 30rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  width: 100%;
  background: #45324a;
  border-radius: 10rpx;
}
.input-text {
  font-size: 26rpx;
  color: #bfbfbf;
}
</style>
