<template>
  <view class="p30">
    <view class="list">
      <view
        v-for="(item, index) in lanList"
        :key="index"
        class="list-item"
        @click="switchLang(item)"
      >
        <text>{{ item.name }}</text>
        <u-image
          v-show="lang == item.value"
          width="36"
          height="36"
          src="/pagesB/static/fabi_xz@2x.png"
        ></u-image>
      </view>
    </view>
  </view>
</template>

<script>
import { getLanguage, setLanguage } from "@/api/profile.js";
export default {
  data() {
    return {
      lang: "en",
      lanList: [
        {
          name: "中文简体",
          value: "zh-cn",
          key: "zh-Hans",
        },
        {
          name: "English",
          value: "en",
          key: "en",
        },
      ],
    };
  },
  onLoad() {
    this.fetchInfo();
  },
  methods: {
    async switchLang(item) {
      if (this.lang === item.value) return;
      this.lang = item.value;
      await setLanguage({ lg: item.value });
      this.$toast("设置成功");
      uni.setLocale(item.key);
      this.$i18n.locale = item.key;
    },
    async fetchInfo() {
      let { data } = await getLanguage();
      this.lang = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  background-color: #341e3a;
  border-radius: 8rpx;
  padding: 0 30rpx;
}
.list-item {
  height: 97rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #bfbfbf;
  &:not(:last-child) {
    border-bottom: 1rpx solid rgba($color: #f5f5f5, $alpha: 0.2);
  }
}
</style>
