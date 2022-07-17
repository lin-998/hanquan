<template>
  <view class="tag-list">
    <view
      v-for="(item, index) in list"
      :key="index"
      :class="{ active: value == item[valueName] }"
      class="tag-item"
      :style="{ 'margin-bottom': marginBottom }"
      @click="itemClick(item)"
    >
      {{ item[labelName] }}
    </view>
  </view>
</template>

<script>
export default {
  name: "AppCheckbox",
  props: {
    valueName: {
      type: String,
      default: "value",
    },
    labelName: {
      type: String,
      default: "label",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    marginBottom: {
      type: String,
      default: "30rpx",
    },
  },
  data() {
    return {};
  },
  methods: {
    itemClick(item) {
      this.$emit("listChange", item);
      this.$emit("input", item[this.valueName]);
    },
  },
};
</script>

<style lang="scss" scoped>
.tag-list {
  display: flex;
  flex-wrap: wrap;
}
.tag-item {
  width: 210rpx;
  height: 70rpx;
  background-color: #45324a;
  color: #999999;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:not(:nth-child(3n)) {
    margin-right: calc((100% - 630rpx) / 2);
  }

  &.active {
    color: #ffffff;
    background-color: #7053a7;
  }
}
</style>
