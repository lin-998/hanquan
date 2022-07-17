<template>
  <u-navbar
    :title="title"
    :background="{ background }"
    back-icon-color="#ffffff"
    title-color="#ffffff"
  >
    <view slot="right" class="pr30 color-999" @click="$emit('right-click')">
      <template v-if="rightText">{{ rightText }}</template>
      <template v-else>
        <slot name="right"></slot>
      </template>
    </view>
  </u-navbar>
</template>

<script>
/**
 * @description 定制性标题栏
 * @property {String} title
 * @property {String} rightText
 * @property {String} background
 * @event {Function()} right-click
 */
export default {
  name: "MyNavbar",
  props: {
    title: {
      type: String,
      default: "",
    },
    rightText: {
      type: String,
      default: "",
    },
    background: {
      type: String,
      default: "transparent",
    },
  },
};
</script>

<style lang="scss"></style>
