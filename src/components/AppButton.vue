<template>
  <button
    :class="[
      'zt-btn',
      plain ? 'zt-' + type + '-outline' : 'zt-' + type,
      getDisabledClass(disabled, type, plain),
    ]"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :form-type="formType"
    :open-type="openType"
    :hover-class="getHoverClass(disabled, type, plain)"
    :hover-start-time="hoverStartTime"
    :hover-stay-time="hoverStayTime"
    :style="{
      width: width,
      height: height,
      lineHeight: plain ? Number.parseInt(height) - 4 + 'rpx' : height,
      borderRadius: radius ? radius : Number.parseInt(height) / 2 + 'rpx',
      fontSize: fontSize + 'rpx',
      color: color,
      backgroundColor: !plain ? backgroundColor : '',
      borderColor: plain ? backgroundColor : '',
      padding: padding,
      margin: margin,
    }"
    @tap="handleClick"
    @getuserinfo="getUserInfor"
    @getphonenumber="getPhoneNumber"
  >
    <slot />
    <view
      v-if="ripple"
      class="u-wave-ripple"
      :class="[waveActive ? 'u-wave-active' : '']"
      :style="{
        top: rippleTop + 'px',
        left: rippleLeft + 'px',
        width: fields.targetWidth + 'px',
        height: fields.targetWidth + 'px',
        'background-color': 'rgba(0, 0, 0, 0.15)',
      }"
    ></view>
  </button>
</template>

<script>
/**
 * 按钮通用组件
 * @description 按钮通用组件
 * @property {String} width 宽度 rpx
 * @property {String} height 高度 rpx
 * @property {String} type = [primary|success|warning|danger] 按钮类型
 * @property {String} fontSize 字体大小
 * @property {Boolean} plain 镂空
 * @event {Function} click 点击事件
 * @example <app-button width="600rpx" height="80rpx" @click=""></app-button>
 */
export default {
  name: "AppButton",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "42rpx",
    },
    radius: {
      type: String,
      default: "10rpx",
    },
    padding: {
      type: String,
      default: "0",
    },
    margin: {
      type: String,
      default: "0",
    },
    type: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "default",
    },
    plain: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    formType: {
      type: String,
    },
    openType: {
      type: String,
    },
    hoverClass: {
      type: String,
      default: "button-hover",
    },
    hoverStartTime: {
      type: Number,
      default: 20,
    },
    hoverStayTime: {
      type: Number,
      default: 70,
    },
    fontSize: {
      type: [Number, String], // rpx
      default: "28rpx",
    },
    color: {
      type: String,
    },
    backgroundColor: {
      type: String, // 为空心按钮时 就是边框颜色
    },
    // 节流，一定时间内只能触发一次
    throttleTime: {
      type: [String, Number],
      default: 500,
    },
    ripple: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      rippleTop: 0, // 水波纹的起点Y坐标到按钮上边界的距离
      rippleLeft: 0, // 水波纹起点X坐标到按钮左边界的距离
      fields: {}, // 波纹按钮节点信息
      waveActive: false, // 激活水波纹
    };
  },
  methods: {
    getHoverClass(disabled, type, plain) {
      let className = "";
      if (disabled || this.ripple) return;
      if (!disabled) {
        className = plain ? "zt-outline_hover" : "zt-" + type + "_hover";
      }
      return className;
    },
    handleClick(e) {
      // 进行节流控制，每this.throttle毫秒内，只在开始处执行
      this.$u.throttle(() => {
        // 如果按钮时disabled和loading状态，不触发水波纹效果
        if (this.loading === true || this.disabled === true) return;
        // 每次点击时，移除上一次的类，再次添加，才能触发动画效果
        this.waveActive = false;
        this.$nextTick(function () {
          this.getWaveQuery(e);
        });
        this.$emit("click", e);
      }, this.throttleTime);
      // this.$emit("click");
    },
    // 查询按钮的节点信息
    getWaveQuery(e) {
      this.getElQuery().then((res) => {
        // 查询返回的是一个数组节点
        let data = res[0];
        // 查询不到节点信息，不操作
        if (!data.width || !data.width) return;
        // 水波纹的最终形态是一个正方形(通过border-radius让其变为一个圆形)，这里要保证正方形的边长等于按钮的最长边
        // 最终的方形（变换后的圆形）才能覆盖整个按钮
        data.targetWidth = data.height > data.width ? data.height : data.width;
        if (!data.targetWidth) return;
        this.fields = data;
        let touchesX = "",
          touchesY = "";
        // #ifdef MP-BAIDU
        touchesX = e.changedTouches[0].clientX;
        touchesY = e.changedTouches[0].clientY;
        // #endif
        // #ifdef MP-ALIPAY
        touchesX = e.detail.clientX;
        touchesY = e.detail.clientY;
        // #endif
        // #ifndef MP-BAIDU || MP-ALIPAY
        touchesX = e.touches[0].clientX;
        touchesY = e.touches[0].clientY;
        // #endif
        // 获取触摸点相对于按钮上边和左边的x和y坐标，原理是通过屏幕的触摸点（touchesY），减去按钮的上边界data.top
        // 但是由于`transform-origin`默认是center，所以这里再减去半径才是水波纹view应该的位置
        // 总的来说，就是把水波纹的矩形（变换后的圆形）的中心点，移动到我们的触摸点位置
        this.rippleTop = touchesY - data.top - data.targetWidth / 2;
        this.rippleLeft = touchesX - data.left - data.targetWidth / 2;
        this.$nextTick(() => {
          this.waveActive = true;
        });
      });
    },
    // 获取节点信息
    getElQuery() {
      return new Promise((resolve) => {
        let queryInfo = "";
        // 获取元素节点信息，请查看uniapp相关文档
        // https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefboundingclientrect
        queryInfo = uni.createSelectorQuery().in(this);
        //#ifdef MP-ALIPAY
        queryInfo = uni.createSelectorQuery();
        //#endif
        queryInfo.select(".zt-btn").boundingClientRect();
        queryInfo.exec((data) => {
          resolve(data);
        });
      });
    },
    getUserInfor(e) {
      this.$emit("getUserInfo", e);
    },
    getPhoneNumber(e) {
      this.$emit("getPhoneNumber", e);
    },
    getDisabledClass: function (disabled, type, plain) {
      let className = "";
      if (disabled && type != "white" && type.indexOf("-") == -1) {
        className = plain ? "tui-dark-disabled-outline" : "tui-dark-disabled";
      }
      return className;
    },
  },
};
</script>

<style lang="scss">
/* S-color */
.zt-default {
  background: $app-primary;
  font-size: 28rpx;
  color: #fff;
  &-outline {
    background: none;
    border: 2rpx solid $app-primary;
    color: $app-primary;
  }
  &_hover {
    background: $app-primary !important;
    color: #e5e5e5 !important;
  }
}

.zt-primary {
  background: #7053a7;
  font-size: 28rpx;
  color: #fff;
  &-outline {
    background: none;
    border: 2rpx solid #7053a7;
    color: #7053a7;
  }
  &_hover {
    background: #7053a7 !important;
    color: #e5e5e5 !important;
  }
}

.zt-success {
  background: #138813;
  font-size: 28rpx;
  color: #fff;
  &-outline {
    background: none;
    border: 2rpx solid #138813;
    color: #138813;
  }
  &_hover {
    background: #138813 !important;
    color: #e5e5e5 !important;
  }
}

.zt-warning {
  background: #f29209;
  font-size: 28rpx;
  color: #fff;
  &-outline {
    background: none;
    border: 2rpx solid #f29209;
    color: #f29209;
  }
  &_hover {
    background: #f29209 !important;
    color: #e5e5e5 !important;
  }
}

.zt-danger {
  background: #cb1c1c;
  font-size: 24rpx;
  color: #fff;
  &-outline {
    background: none;
    border: 2rpx solid #cb1c1c;
  }
  &_hover {
    background: #cb1c1c !important;
    color: #fff !important;
  }
}

// .zt-gray-primary {
//   background: #70bcf6;
//   font-size: 28rpx;
//   color: #fff;
//   &-outline {
//     background: none;
//     border: 2rpx solid #70bcf6;
//     color: #70bcf6;
//   }
//   &_hover {
//     background: #60a5d2 !important;
//     color: #e5e5e5 !important;
//   }
// }

.zt-cancel {
  background: #a6a6a6;
  font-size: 24rpx;
  color: #fff;
  &-outline {
    background: none;
    border: 2rpx solid #a6a6a6;
  }
  &_hover {
    background: #a6a6a6 !important;
    color: #fff !important;
  }
}

.zt-white {
  background-color: #fff;
  color: #333;
  &-outline {
    background: none;
    border: 2rpx solid #fff;
    color: #fff;
  }
  &_hover {
  }
}
/* E-color */

/* S-button */
.zt-btn {
  box-sizing: border-box;
  display: block;
  position: relative;
  padding-left: 5rpx;
  padding-right: 5rpx;
  border-radius: 10rpx;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &::after {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    transform-origin: 0 0;
    transform: scale(0.5, 0.5);
    border: 0 !important;
    box-sizing: border-box;
    left: 0;
    top: 0;
    border-radius: 20rpx;
  }
}

.zt-outline_hover {
  opacity: 0.5;
}

.tui-dark-disabled {
  opacity: 0.6 !important;
  color: #fafbfc !important;
}

.tui-dark-disabled-outline {
  opacity: 0.5 !important;
}

.u-wave-ripple {
  z-index: 0;
  position: absolute;
  border-radius: 100%;
  background-clip: padding-box;
  pointer-events: none;
  user-select: none;
  transform: scale(0);
  opacity: 1;
  transform-origin: center;
}

.u-wave-ripple.u-wave-active {
  opacity: 0;
  transform: scale(2);
  transition: opacity 1s linear, transform 0.4s linear;
}
</style>
