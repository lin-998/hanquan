<template>
  <view :style="{ background }">
    <view
      class="app-nav-bar"
      :style="{
        'z-index': zIndex,
        'padding-top': statusHeight + 'px',
        background: background,
        width: width,
      }"
    >
      <view v-if="!custom" class="header">
        <view class="head-item" @tap="leftClick">
          <u-icon
            name="arrow-left"
            :color="leftColor"
            :size="leftSize"
          ></u-icon>
        </view>
        <view class="header-center">
          <slot name="center">
            <text class="fontsize-32" :style="{ color: titleColor }">
              {{ title }}
            </text>
          </slot>
        </view>
        <view v-if="isRight" class="head-item">
          <slot name="right"></slot>
        </view>
      </view>
      <slot></slot>
    </view>
    <view
      class="navbar-placeholder"
      :style="{
        width: '100%',
        height: Number(navbarHeight) + statusHeight + 'px',
        background: background,
      }"
    ></view>
  </view>
</template>

<script>
/**
 * 导航栏通用组件
 * @description 导航栏通用组件
 * @property {String} height 高度 px
 * @property {String} background 背景
 * @property {String} title 标题
 * @property {Boolean} custom 是否自定义导航栏内容
 * @property {Boolean} isRight 是否需要右边
 * @event {Function} left-click 左侧点击事件
 * @example <app-nav-bar></app-nav-bar>
 */
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();
export default {
  name: "AppNavBar",
  props: {
    // 导航栏高度，单位px，非rpx
    height: {
      type: [String, Number],
      default: "",
    },
    zIndex: {
      type: [String, Number],
      default: 99,
    },
    // 背景
    background: {
      type: String,
      default: "#fff",
    },
    // 是否自定义导航栏内容
    custom: {
      type: Boolean,
      default: false,
    },
    // 是否需要右边
    isRight: {
      type: Boolean,
      default: true,
    },
    // 导航栏title
    title: {
      type: String,
      default: "",
    },
    leftColor: {
      type: String,
      default: "#333",
    },
    leftSize: {
      type: String,
      default: "40",
    },

    // 处理小程序胶囊占位
    width: {
      type: [String, Number],
      default: "100%",
    },
    titleColor: {
      type: String,
    },
  },
  data() {
    return {
      statusHeight: systemInfo.statusBarHeight,
    };
  },
  computed: {
    // 转换字符数值为真正的数值
    navbarHeight() {
      // #ifdef APP-PLUS || H5
      return this.height ? this.height : 44;
      // #endif
      // #ifdef MP
      let height = systemInfo.platform == "ios" ? 44 : 48;
      return this.height ? this.height : height;
      // #endif
    },
  },
  methods: {
    leftClick() {
      uni.navigateBack();
      this.$emit("left-click");
    },
  },
};
</script>

<style lang="scss" scoped>
.app-nav-bar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.header {
  display: flex;
  align-items: center;
  height: 44px;
  &-center {
    flex: 1;
    // text-align: center;
  }
  .head-item {
    width: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
