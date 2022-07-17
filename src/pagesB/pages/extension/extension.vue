<template>
  <view class="row--center__spaceB u-flex-wrap p50">
    <view
      v-for="(item, index) in MENU"
      :key="index"
      class="cp-item"
      @click="toZhiTui(index)"
    >
      <u-image width="98" height="98" :src="fixIcon(item.icon)"></u-image>
      <view class="fontsize-38 color-yellow">{{ item.value }}</view>
      <view>{{ item.label }}</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      MENU: [
        {
          label: this.$t("zhi-tui-ren-shu"),
          value: "2",
          icon: "zhitui_icon",
          prop: "zt_num",
        },
        {
          label: this.$t("tuan-dui-ren-shu"),
          value: "9",
          icon: "tuandui_icon",
          prop: "team_num",
        },
        {
          label: this.$t("jin-ri-shou-yi"),
          value: "179.0956",
          icon: "shouyi_icon",
          prop: "today_profit",
        },
        {
          label: this.$t("lei-ji-shou-yi"),
          value: "201741",
          icon: "qiandai_icon",
          prop: "all_profit",
        },
      ],
    };
  },
  onLoad() {
    let info = this.$store.getters.userInfo;
    this.MENU.forEach((m) => {
      m.value = info[m.prop];
    });
  },
  methods: {
    toZhiTui(index) {
      if (index == 0) {
        uni.navigateTo({
          url: "/pagesB/pages/extension/zhi-tui",
        });
      }
      console.log(index);
    },
    fixIcon(name) {
      return `/pagesB/static/${name}@2x.png`;
    },
  },
};
</script>

<style lang="scss" scoped>
.cp-item {
  width: 300rpx;
  height: 300rpx;
  background-color: #45324a;
  border-radius: 8rpx;
  margin-bottom: 42rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20rpx 0;
}
</style>
